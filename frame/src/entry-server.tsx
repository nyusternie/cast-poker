/* Import modules. */
import { farcasterHubContext } from 'frames.js/middleware'
import { createFrames, Button } from 'frames.js/express'

/**
 * Frames
 *
 * Initialize the Frames handler.
 */
const frames = createFrames({
    middleware: [
        farcasterHubContext({
            ...(process.env.NODE_ENV === 'production'
                ? {}
                : {
                    hubHttpUrl: 'http://localhost:3010/hub',
                }),
        }),
    ],
})

/**
 * Landing Page Buttons
 *
 * Handles the initial buttons displayed to the user.
 */
const btnLandingPage = () => {
    return (
        <Button action="post" key="1" target={{ query: { saidGm: true } }}>
            Say GM!!
        </Button>
    )
}

/**
 * Handle Buttons
 *
 * Manages the Frame buttons.
 */
const handleButtons = (_ctx) => {
    /* Initialize locals. */
    let buttons

    /* Initialize buttons. */
    buttons = []

    /* Add buttons. */
    buttons.push(btnLandingPage())

    /* Handle search parameters. */
    if (!_ctx.url.searchParams.has('saidGm')) {
        return buttons
    } else {
        return []
    }
}

const hiImage = (_ctx) => {
    return (
        <div tw="w-full h-full flex justify-center items-center bg-purple-800 text-white">
            Hi there!
        </div>
    )
}

const gmImage = (_ctx) => {
    return (
        <div tw="w-full h-full flex flex-col justify-center items-center bg-rose-100">
            <div tw="flex text-7xl text-sky-500 font-light italic">
                GM, {_ctx.message.requesterUserData?.displayName}!
            </div>

            <div tw="mt-6 flex text-slate-800 font-bold tracking-widest uppercase">
                Your FID is{" "}
                {_ctx.message.requesterFid}
            </div>

            <div tw="mt-3 flex text-4xl text-slate-500 font-medium">
                {_ctx.message.requesterFid < 20_000
                    ? "You're OG!"
                    : "Welcome to the Farcaster!"
                }
            </div>
        </div>
    )
}

/**
 * Handle Image
 *
 * Manages the Frame images.
 */
const handleImage = (_ctx) => {
    /* Initialize locals. */
    let message

    /* Set message. */
    message = _ctx.message

    /* Validate message. */
    if (message) {
        return gmImage(_ctx)
    } else {
        return hiImage(_ctx)
    }
}

export const handleRequest = frames(_ctx => {
// console.log('CONTEXT', _ctx)
    return {
        image: handleImage(_ctx),
        buttons: handleButtons(_ctx),
    }
})
