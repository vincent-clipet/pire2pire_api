# CONFIG
app_host=localhost:3000
route="/users"
data="{}"



# RUN
echo "> Get all users"
curl "$app_host$route"

echo
exit 0
