import ProtonWebSDK, { setUITheme, runUIDemo } from '@proton/web-sdk'
import type { ProtonWebLink, LinkSession, TransactResult, Link } from '@proton/web-sdk'
import { Serialize, JsonRpc, JsonRpcPulseVM } from '@proton/js'
import type { RpcInterfaces } from '@proton/js'

export let link: ProtonWebLink | Link | undefined
export let session: LinkSession | undefined

const USE_PULSE_VM = !!import.meta.env.VITE_USE_PULSE_VM
const REQUEST_ACCOUNT = 'taskly'
const CHAIN_ID = USE_PULSE_VM
  ? 'bef02258ee702d2d8df016ce2f2cbcf6bfa986dcd8c8641acd9068b8f9c4c7ef'
  : '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd'
const ENDPOINTS = USE_PULSE_VM
  ? [
      'https://pulsevm-devnet-01.metalblockchain.org/ext/bc/2T6FphmDo8szR3UERGsDsXaQPb52xUn2djnAt7S6LECbHDhc5L/rpc',
    ]
  : [
      'https://rpc.api.testnet.metalx.com',
      'https://proton-testnet1.eoscafeblock.com',
      'https://test.proton.eosusa.io',
    ]

const SCHEME = USE_PULSE_VM ? 'achain' : undefined
const TOKEN_CONTRACT = USE_PULSE_VM ? 'pulse.token' : 'eosio.token'
const rpcClass = USE_PULSE_VM ? JsonRpcPulseVM : JsonRpc
const rpc = new rpcClass(ENDPOINTS)

export const createLink = async ({
  restoreSession = false,
}: {
  restoreSession?: boolean
}): Promise<void> => {
  const { link: localLink, session: localSession } = await ProtonWebSDK({
    linkOptions: {
      endpoints: ENDPOINTS,
      chainId: CHAIN_ID,
      restoreSession,
      scheme: SCHEME,
      usePulseVM: USE_PULSE_VM,
    },
    transportOptions: {
      requestAccount: REQUEST_ACCOUNT,
    },
    selectorOptions: {},
    uiOptions: {
      appInfo: {
        name: 'Taskly',
      },
    },
  })
  link = localLink
  session = localSession
}

export const login = async (): Promise<LinkSession | undefined> => {
  await createLink({ restoreSession: false })
  if (session) {
    return session
  }
}

export const transact = async (
  actions: Serialize.Action[],
  broadcast: boolean,
): Promise<TransactResult> => {
  if (session) {
    return session.transact(
      {
        transaction: {
          actions,
        } as never,
      },
      { broadcast },
    )
  } else {
    throw new Error('No Session')
  }
}

export const logout = async (): Promise<void> => {
  if (link && session) {
    await link.removeSession(REQUEST_ACCOUNT, session.auth, CHAIN_ID)
  }
  session = undefined
  link = undefined
}

export const reconnect = async (): Promise<LinkSession | undefined> => {
  if (!session) {
    await createLink({ restoreSession: true })
  }

  if (session) {
    return session
  }
}

export const transfer = async ({ to, amount }: { to: string; amount: string }) => {
  if (!session) {
    throw new Error('No Session')
  }

  try {
    return await session.transact(
      {
        actions: [
          {
            /**
             * The token contract, precision and symbol for tokens can be seen at protonscan.io/tokens
             */

            // Token contract
            account: TOKEN_CONTRACT,

            // Action name
            name: 'transfer',

            // Action parameters
            data: {
              // Sender
              from: session.auth.actor,

              // Receiver
              to: to,

              // 4 is precision, XPR is symbol
              quantity: `${(+amount).toFixed(4)} XPR`,

              // Optional memo
              memo: '',
            },
            authorization: [session.auth],
          },
        ],
      },
      {
        broadcast: true,
      },
    )
  } catch (error) {
    console.log('GOT ERROR', error, (error as any).json)
    throw error
  }
}

export async function getProtonAvatar(
  account: string,
): Promise<RpcInterfaces.UserInfo | undefined> {
  try {
    const result = await rpc.get_table_rows({
      code: TOKEN_CONTRACT,
      scope: TOKEN_CONTRACT,
      table: 'usersinfo',
      key_type: 'i64',
      lower_bound: account,
      index_position: 1,
      limit: 1,
    })

    if (result.rows.length > 0 && result.rows[0].acc === account) {
      return result.rows[0]
    }
  } catch (e) {
    console.error('getProtonAvatar error', e)
  }

  return undefined
}

function setTheme() {
  setUITheme('my')
}

function runDemo() {
  runUIDemo()
}

export default {
  link,
  login,
  transact,
  logout,
  reconnect,
  transfer,
  setTheme,
  runDemo,
}
