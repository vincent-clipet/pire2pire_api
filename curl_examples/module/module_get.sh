# CONFIG
app_host=localhost:3000
route="/module/1"



# RUN
echo "> Get module '1'"
curl "$app_host$route"

echo
exit 0
