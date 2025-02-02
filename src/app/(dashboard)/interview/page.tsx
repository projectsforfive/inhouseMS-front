// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Cardlist from '@views/interview/InterviewBoard'

// Util Imports
import { commonLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from '@views/interview/styles.module.css'

const InterviewPage = () => {
  return (
    <div
      className={classnames(
        commonLayoutClasses.contentHeightFixed,
        styles.scroll,
        'is-full overflow-auto pis-2 -mis-2'
      )}
    >
      <Cardlist />
    </div>
  )
}

export default InterviewPage
