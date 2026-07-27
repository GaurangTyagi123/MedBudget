/**
 * Layout for the notification workflow routes.
 */

import Protect from '../_components/Protect'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Protect>{children}</Protect>
    </>
  )
}

export default layout
