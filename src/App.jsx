import React from "react"
import TableLoader from "./Components/TableLoader"
import whyDidYouRender from '@welldone-software/why-did-you-render';


if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

function App() {

  return (
    <>
      <TableLoader />
    </>
  )
}

export default App
