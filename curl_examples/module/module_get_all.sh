# CONFIG
app_host=localhost:3000
route="/modules"
data="{}"



# RUN
echo "> Get all modules"
curl "$app_host$route"

echo
exit 0
