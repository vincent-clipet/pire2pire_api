# CONFIG
app_host=localhost:3000
route="/training/1"
data="{}"



# RUN
echo "> Get training '1'"
curl "$app_host$route"

echo
exit 0
