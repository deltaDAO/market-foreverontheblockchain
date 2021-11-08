import React, { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/overpass-mono'
import '../global/styles.css'

export default function Styles({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  )
}
