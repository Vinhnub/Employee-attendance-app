curl -X POST "http://26.253.176.29:5555/manager/reset_password" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3NjE0NDcyMjB9.E_z_d4hJExjIx4TJ9YL_22AaYZql4BwfjOepdz6Q1uY" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"username\": \"vinh\", \"new_password\": \"vinh\"}"


curl -X GET "http://26.253.176.29:5555/auth/me" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3NjE0NDgyMTV9.2FeZiTxSmrA3Fzu5dn1GuUzsbk7vUZpB7Jozc8WlA08" -H "accept: application/json" -H "Content-Type: application/json"

curl -X POST "http://26.253.176.29:5555/employee/start_shift" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3NjE0NDkxNDB9.OhpBgXf_b8YeidMprL33OG-TOXYzg8y3DPZDQUMm-zo" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"end_time\": \"2025-10-25 10:35:00\", \"note\": \"No thing\"}"