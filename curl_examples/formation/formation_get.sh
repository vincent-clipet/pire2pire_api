# CONFIG
app_host=localhost:3000
route="/formation/1"
data="{}"



# RUN
echo "> Get formation '1'"
curl "$app_host$route"

echo
exit 0
