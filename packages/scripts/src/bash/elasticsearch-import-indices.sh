FULL_PATH=$(dirname "$0")
FILE_PATH="${FILE_PATH:-./data/.index}"

while getopts f: option
 do
  case "${option}"
   in
    f) FILE_PATH=${OPTARG};
  esac
 done

$FULL_PATH/elasticsearch-import-index.sh -f $FILE_PATH -n searchspecimen
$FULL_PATH/elasticsearch-import-index.sh -f $FILE_PATH -n searchplace
$FULL_PATH/elasticsearch-import-index.sh -f $FILE_PATH -n searchnormalizedagent
$FULL_PATH/elasticsearch-import-index.sh -f $FILE_PATH -n searchstoragelocation
$FULL_PATH/elasticsearch-import-index.sh -f $FILE_PATH -n searchtaxon
$FULL_PATH/elasticsearch-import-index.sh -f $FILE_PATH -n searchtaxonname
