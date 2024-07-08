import React, { Suspense } from 'react'

function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Suspense>
                {
                    children
                }
            </Suspense>
        </div>
    )
}

export default CartLayout