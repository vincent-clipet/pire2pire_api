# CONFIG
app_host=localhost:3000
route="/permission/create"
data_json="./permission_create.json"



# RUN
echo "> Create a new permission"
curl -X POST -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
