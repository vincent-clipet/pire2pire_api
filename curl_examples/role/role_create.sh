# CONFIG
app_host=localhost:3000
route="/role/create"
data_json="./role_create.json"



# RUN
echo "> Create a new role"
curl -X POST -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
