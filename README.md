curl -X POST "http://26.253.176.29:5555/manager/create_account" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoibWFuYWdlciIsImV4cCI6MTc2MTU3OTk3OH0.LHF0UaBMReRGEQF64CIlgCCVvVNkWcJ0c6ye5xQtEjc" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"username\": \"thong\", \"password\": \"thong\", \"fullname\": \"Thông\", \"role\": \"staff\"}"

curl -X GET "http://10.13.13.27:5555/manager/logs/{2025}/{10}/{26}" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoibWFuYWdlciIsImV4cCI6MTc2MTYyNTgyMH0.1S0nLkNiBBvJfay4h4Miv-dOMxa7Rh7Ua6voUD1MU8c" -H "accept: application/json" -H "Content-Type: application/json"

curl -X POST "http://26.253.176.29:5555/employee/start_shift" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJyb2xlIjoic3RhZmYiLCJleHAiOjE3NjE1ODA5OTN9.BKYmhtgfzzksJcVoEnWaHGCf9VgHomS1WZ8BGJnER_A" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"end_time\": \"2025-10-26 23:30:00\", \"note\": \"No thing\"}"

curl -X PUT "http://26.253.176.29:5555/employee/end_shift" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJyb2xlIjoic3RhZmYiLCJleHAiOjE3NjE1ODA5OTN9.BKYmhtgfzzksJcVoEnWaHGCf9VgHomS1WZ8BGJnER_A" -H "accept: application/json" -H "Content-Type: application/json"

curl -X PUT "http://26.253.176.29:5555/employee/edit_shift" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJyb2xlIjoic3RhZmYiLCJleHAiOjE3NjE1ODA5OTN9.BKYmhtgfzzksJcVoEnWaHGCf9VgHomS1WZ8BGJnER_A" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"new_end_time\": \"2025-10-26 23:10:00\", \"new_note\": \"No thing\"}"

curl -X GET "http://26.253.176.29:5555/manager/shifts" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3NjE1Mjk2NzV9.U5dQOLn3dc2PAhK2_Ob6aH3Chs1pZ8ebFUjtGm9quiQ" -H "accept: application/json" -H "Content-Type: application/json"

curl -X PUT "http://26.253.176.29:5555/manager/users/{1}/reset" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3NjE1Mjc0NzZ9.PSMyNXsQd9bqGg-6Xbqwjpi9cKKQ4Zyz6etPPPIqTU0" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"new_password\": \"vinh1255\"}"

curl -X GET "http://26.253.176.29:5555/manager/users/{2}/logs" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NjE1MzcyNDF9.ZvMfCUyqDWzyH2Gcj5szCn8V__uuQEYkmQHBV8S5g28" -H "accept: application/json" -H "Content-Type: application/json"