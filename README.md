Builds anthonycameron.com (not yet, one day)

# Notes to self

Dev: `gatsby develop`
Build: `rm -rf .cache; gatsby build; gatsby serve`

Win linux subsytem fix: `execstack -c node_modules/sharp/vendor/lib/librsvg-2.so.2`

From public/ dir, `gsutil -m rsync -r -d . gs://test.anthonycameron.com` (`-d` to delete things not in src)

https://cloud.google.com/sdk/docs/#windows
https://cloud.google.com/storage/docs/static-website
