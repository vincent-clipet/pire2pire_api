# CONFIG
app_host=localhost:3000
route="/formations"
data="{}"



# RUN
echo "> Get all formations"
curl "$app_host$route"

echo
exit 0
