# CONFIG
app_host=localhost:3000
route="/user/1"
data="{}"



# RUN
echo "> Get user '1'"
curl "$app_host$route"

echo
exit 0
