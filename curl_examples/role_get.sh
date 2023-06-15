# CONFIG
app_host=localhost:3000
route="/role/1"
data="{}"



# RUN
echo "> Get role '1'"
curl "$app_host$route"

echo
exit 0
