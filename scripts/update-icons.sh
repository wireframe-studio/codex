cd public/assets/icons

ls | grep -v '^all\.txt$' > all.txt

icons_ts="../../../src/global/components/icon/icons.ts"

echo "export const icons = {" > $icons_ts
cat all.txt | while read line; do
	if ! grep -q "$line" $icons_ts; then
		echo "\t'${line%.svg}': '/assets/icons/$line'," >> $icons_ts
	fi
done

echo "} as const;" >> $icons_ts

cat $icons_ts

rm all.txt