#!/usr/bin/bash

if [[ $1 == "-h" ]] || [[ $1 == "--help" ]]; then
  echo -e "Prepare\n  Usage: ./prepare.sh [day]\n";
  echo "The script creates the corresponding src directory for the day and copies the script template.";
  echo -e "\nArguments:\n    day: optional override for day the script is running for";
  exit 0;
fi;

CURRENT_DAY=$(date +%d);
SELECTED_DAY="${1:-$CURRENT_DAY}";
DIR_PATH="src/day-$SELECTED_DAY";

if [[ -d $DIR_PATH ]]; then
  echo "$DIR_PATH already exists, skipping";
  exit 0
fi;

mkdir $DIR_PATH;
cp src/template/script.ts $DIR_PATH/;
sed -i "s=input/day-XX=input/day-${SELECTED_DAY}=" $DIR_PATH/script.ts;
sed -i '13d' $DIR_PATH/script.ts;

echo "Created directory at '$DIR_PATH' and copied script template";
