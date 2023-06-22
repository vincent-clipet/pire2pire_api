# CONFIG
app_host=localhost:3000
route="/login"
data_json="./json_data/login.json"



# RUN
echo "> Login"
curl -X POST \
	-H "Content-Type: application/json" \
	-d @$data_json \
	"$app_host$route"

echo
exit 0
