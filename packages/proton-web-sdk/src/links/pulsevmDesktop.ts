// Pulse Edition — native PulseVM desktop-wallet transport.
//
// Unlike the WebAuth/Anchor paths (ESR over the `achain`/`proton` schemes via
// @proton/link), the native macOS PulseVM wallet speaks the `pulsevm://` URL
// scheme: the dapp packs a transaction, hands it to the wallet over a deep link,
// the wallet signs on-device (Touch ID / Secure Enclave) and redirects back to a
// callback URL with the signature. This module provides login + a `transact`
// session that mirrors the LinkSession surface ConnectWallet consumers expect.

interface Authorization {
  actor: string
  permission: string
}
interface PulseAction {
  account: string
  name: string
  authorization: Authorization[]
  data: Record<string, any>
}
export interface PulseDesktopSession {
  auth: {actor: string; permission: string}
  publicKey?: string
  walletType: 'pulsevm'
  logout: () => void
  transact: (
    args: {actions: PulseAction[]},
    opts?: {broadcast?: boolean}
  ) => Promise<{transactionId?: string; signature: string; packedTrx: string}>
}

const SESSION_KEY = 'pulsevm-desktop-session'
const here = () => location.origin + location.pathname

function newRid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function loginURL(p: {callback?: string; relay?: string; rid?: string}): string {
  const q = new URLSearchParams()
  if (p.callback) q.set('callback', p.callback)
  if (p.relay && p.rid) {
    q.set('relay', p.relay)
    q.set('rid', p.rid)
  }
  return `pulsevm://login?${q.toString()}`
}
export function signURL(p: {
  chainId: string
  packedTrx: string
  summary?: string
  callback?: string
  relay?: string
  rid?: string
}): string {
  const q = new URLSearchParams({chain_id: p.chainId, packed_trx: p.packedTrx})
  if (p.summary) q.set('summary', p.summary)
  if (p.callback) q.set('callback', p.callback)
  if (p.relay && p.rid) {
    q.set('relay', p.relay)
    q.set('rid', p.rid)
  }
  return `pulsevm://sign?${q.toString()}`
}

/** Trigger a custom-scheme URL without navigating the page away. */
function triggerScheme(url: string) {
  const f = document.createElement('iframe')
  f.style.display = 'none'
  f.src = url
  document.body.appendChild(f)
  setTimeout(() => f.remove(), 1500)
}

/** Resolve when localStorage[key] is written by the wallet callback tab. */
function awaitResult(key: string, timeoutMs = 120_000): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    const check = () => {
      const v = localStorage.getItem(key)
      if (v) {
        cleanup()
        localStorage.removeItem(key)
        resolve(JSON.parse(v))
      }
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) check()
    }
    const poll = setInterval(check, 400)
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('PulseVM wallet request timed out'))
    }, timeoutMs)
    function cleanup() {
      clearInterval(poll)
      clearTimeout(timer)
      removeEventListener('storage', onStorage)
    }
    addEventListener('storage', onStorage)
    check()
  })
}

/** Poll the relay for a result keyed by rid (seamless path — no browser tab). */
function awaitRelay(relay: string, rid: string, timeoutMs = 120_000): Promise<Record<string, string>> {
  const base = relay.replace(/\/$/, '')
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const poll = setInterval(async () => {
      try {
        const r = await fetch(`${base}/result/${rid}`, {cache: 'no-store'})
        if (r.status === 200) {
          clearInterval(poll)
          resolve(await r.json())
        } else if (Date.now() - start > timeoutMs) {
          clearInterval(poll)
          reject(new Error('PulseVM wallet request timed out'))
        }
      } catch (e) {
        if (Date.now() - start > timeoutMs) {
          clearInterval(poll)
          reject(e as Error)
        }
      }
    }, 800)
  })
}

/**
 * Call once on page load. If this page is the wallet callback (has ?account or
 * ?signature), stash the result for the originating tab and return true.
 * (Only needed for the browser-callback fallback; the relay path needs no callback.)
 */
export function handlePulseVMCallback(): boolean {
  const p = new URLSearchParams(location.search)
  if (p.get('account')) {
    localStorage.setItem(
      'pulse.cb.login',
      JSON.stringify({
        account: p.get('account') || '',
        permission: p.get('permission') || 'active',
        key: p.get('key') || '',
      })
    )
    return true
  }
  if (p.get('signature')) {
    const rid = p.get('rid') || 'default'
    localStorage.setItem('pulse.cb.sign.' + rid, JSON.stringify({signature: p.get('signature') || ''}))
    return true
  }
  return false
}

async function rpc<T>(endpoint: string, method: string, params: unknown = {}): Promise<T> {
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({jsonrpc: '2.0', id: 1, method, params}),
  })
  const j = await r.json()
  if (j.error) throw new Error(j.error.data || j.error.message)
  return j.result as T
}

// ── transfer serialization (matches pulse-web-sdk / pulsevm-js) ──
const te = new TextEncoder()
const B0 = BigInt(0)
const B5 = BigInt(5)
const B64 = BigInt(64)
const B0x1f = BigInt(0x1f)
const B0x0f = BigInt(0x0f)
const B0xff = BigInt(0xff)
const B8 = BigInt(8)
const U64MASK = (BigInt(1) << B64) - BigInt(1)
function charVal(c: number): bigint {
  if (c >= 97 && c <= 122) return BigInt(c - 97 + 6)
  if (c >= 49 && c <= 53) return BigInt(c - 49 + 1)
  return B0
}
function nameToU64(s: string): bigint {
  let v = B0
  for (let i = 0; i < 13; i++) {
    const c = i < s.length ? charVal(s.charCodeAt(i)) : B0
    if (i < 12) v |= (c & B0x1f) << (B64 - B5 * BigInt(i + 1))
    else v |= c & B0x0f
  }
  return v & U64MASK
}
function u64le(v: bigint): number[] {
  const b: number[] = []
  let x = v
  for (let i = 0; i < 8; i++) {
    b.push(Number(x & B0xff))
    x >>= B8
  }
  return b
}
function u32le(v: number): number[] {
  const b: number[] = []
  let x = v >>> 0
  for (let i = 0; i < 4; i++) {
    b.push(x & 0xff)
    x = Math.floor(x / 256)
  }
  return b
}
function u16le(v: number): number[] {
  return [v & 0xff, (v >> 8) & 0xff]
}
function varu(v: number): number[] {
  const o: number[] = []
  let x = v >>> 0
  do {
    let b = x & 0x7f
    x = Math.floor(x / 128)
    if (x) b |= 0x80
    o.push(b)
  } while (x)
  return o
}
function assetBytes(qty: string): number[] {
  const [amt, sym] = qty.trim().split(/\s+/)
  const dot = amt.indexOf('.')
  const prec = dot < 0 ? 0 : amt.length - dot - 1
  const amount = BigInt(amt.replace('.', ''))
  const o = [...u64le(amount), prec]
  const sb = te.encode(sym)
  for (let i = 0; i < 7; i++) o.push(i < sb.length ? sb[i] : 0)
  return o
}
function hex(a: number[]): string {
  return a.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Serialize a single `transfer` action into a packed transaction (hex) with live TAPOS. */
async function packTransfer(endpoint: string, action: PulseAction): Promise<string> {
  const d = action.data as {from: string; to: string; quantity: string; memo?: string}
  const auth = action.authorization[0]
  const info = await rpc<any>(endpoint, 'pulsevm.getInfo')
  const idb = info.head_block_id.match(/../g)!.map((h: string) => parseInt(h, 16))
  const refPrefix = (idb[8] | (idb[9] << 8) | (idb[10] << 16) | (idb[11] << 24)) >>> 0
  const memo = te.encode(d.memo || '')
  const data = [
    ...u64le(nameToU64(d.from)),
    ...u64le(nameToU64(d.to)),
    ...assetBytes(d.quantity),
    ...varu(memo.length),
    ...memo,
  ]
  const tx = [
    ...u32le(Math.floor(Date.now() / 1000) + 120),
    ...u16le(info.head_block_num & 0xffff),
    ...u32le(refPrefix),
    ...varu(0),
    0,
    ...varu(0),
    ...varu(0),
    ...varu(1),
    ...u64le(nameToU64(action.account)),
    ...u64le(nameToU64(action.name)),
    ...varu(1),
    ...u64le(nameToU64(auth.actor)),
    ...u64le(nameToU64(auth.permission)),
    ...varu(data.length),
    ...data,
    ...varu(0),
  ]
  return hex(tx)
}

function makeSession(
  s: {actor: string; permission: string; publicKey: string},
  opts: {endpoint: string; chainId: string; storage?: any; relay?: string}
): PulseDesktopSession {
  return {
    walletType: 'pulsevm',
    auth: {actor: s.actor, permission: s.permission},
    publicKey: s.publicKey,
    logout() {
      localStorage.removeItem(SESSION_KEY)
      opts.storage?.remove?.('wallet-type')
      opts.storage?.remove?.('user-auth')
    },
    async transact({actions}, txOpts = {}) {
      if (actions.length !== 1 || actions[0].name !== 'transfer') {
        throw new Error(
          'PulseVM desktop transport serializes `transfer` only; use pulsevm-js for arbitrary actions and pass the packed trx.'
        )
      }
      const packed = await packTransfer(opts.endpoint, actions[0])
      const rid = newRid()
      const d = actions[0].data as any
      const summary = `Transfer ${d.quantity} to ${d.to}`
      // Relay path = seamless (no browser tab); else fall back to a browser callback.
      let res: Record<string, string>
      if (opts.relay) {
        triggerScheme(signURL({chainId: opts.chainId, packedTrx: packed, summary, relay: opts.relay, rid}))
        res = await awaitRelay(opts.relay, rid)
      } else {
        triggerScheme(signURL({chainId: opts.chainId, packedTrx: packed, summary, callback: `${here()}?rid=${rid}`}))
        res = await awaitResult('pulse.cb.sign.' + rid)
      }
      const out: {transactionId?: string; signature: string; packedTrx: string} = {
        signature: res.signature,
        packedTrx: packed,
      }
      if (txOpts.broadcast !== false) {
        const r = await rpc<any>(opts.endpoint, 'pulsevm.issueTx', {
          signatures: [res.signature],
          compression: 'none',
          packed_context_free_data: '',
          packed_trx: packed,
        })
        out.transactionId = typeof r === 'string' ? r : r?.transaction_id || r?.id
      }
      return out
    },
  }
}

/** Log in to the native PulseVM desktop wallet over `pulsevm://`. */
export async function loginPulseVMDesktop(opts: {
  endpoint: string
  chainId: string
  storage?: any
  restoreSession?: boolean
  relay?: string
}): Promise<{session: PulseDesktopSession; loginResult: any}> {
  // Restore from saved auth if requested. If there's nothing to restore, return
  // with no session — do NOT pop a wallet prompt (that caused a spurious second
  // window on page load).
  if (opts.restoreSession) {
    const raw = localStorage.getItem(SESSION_KEY)
    if (raw) {
      const s = JSON.parse(raw)
      return {session: makeSession(s, opts), loginResult: undefined}
    }
    return {session: undefined as any, loginResult: undefined}
  }

  // Relay path = seamless (no browser tab); else fall back to a browser callback.
  let res: Record<string, string>
  if (opts.relay) {
    const rid = newRid()
    triggerScheme(loginURL({relay: opts.relay, rid}))
    res = await awaitRelay(opts.relay, rid)
  } else {
    triggerScheme(loginURL({callback: here()}))
    res = await awaitResult('pulse.cb.login')
  }
  const s = {actor: res.account, permission: res.permission || 'active', publicKey: res.key || ''}
  localStorage.setItem(SESSION_KEY, JSON.stringify(s))
  opts.storage?.write?.('wallet-type', 'pulsevm')
  opts.storage?.write?.('user-auth', JSON.stringify({actor: s.actor, permission: s.permission}))
  return {session: makeSession(s, opts), loginResult: {session: makeSession(s, opts)}}
}
