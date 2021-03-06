import { useEffect } from 'react'

const useEffectScroll = ({ currentRowNumber, list }) => {
  return useEffect(() => {
    const scroll = () => {
      // ensure list.current still mounted
      if (list.current) {
        const [firstVisibleRow, lastVisibleRow] = list.current.getVisibleRange()

        // this special case is to avoid that the focused row is hidden behind the
        // table header, which is fixed positioned and therefore seen by
        // react-list as the first row in terms of scroll position
        if (currentRowNumber <= firstVisibleRow + 1) {
          list.current.scrollTo(currentRowNumber - 1)
        } else if (currentRowNumber > lastVisibleRow) {
          // if it's beyond the last visible row, scroll it to be the last visible
          // row, but not higher up, to avoid a jumping list when clicking on the
          // last clickable row (which might not be fully visible)
          list.current.scrollTo(
            currentRowNumber + firstVisibleRow - lastVisibleRow
          )
        }
      }
    }

    if (list.current && currentRowNumber) {
      const [firstVisibleRow, lastVisibleRow] = list.current.getVisibleRange()

      if (
        firstVisibleRow === undefined ||
        (firstVisibleRow === 0 && lastVisibleRow === 0)
      ) {
        setTimeout(() => scroll())
      } else {
        scroll()
      }
    }
  }, [currentRowNumber, list])
}

export default useEffectScroll
