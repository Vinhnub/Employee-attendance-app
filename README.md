curl -X POST "http://26.253.176.29:5555/manager/create_account" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NjE1NDM5NTZ9.VsOtiFhS4Wb1S3UpzAUBhmvgsyPmLpsD5lwwcEc1NW4" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"username\": \"quan\", \"password\": \"quan\", \"fullname\": \"Quân\", \"role\": \"staff\"}"

curl -X GET "http://26.253.176.29:5555/auth/me" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3NjE0NTkxMzh9.qkCB1x-SZtu0_-othroWv3HEIyEUTnsX6mDAzfxNeDM" -H "accept: application/json" -H "Content-Type: application/json"

curl -X PUT "http://26.253.176.29:5555/employee/edit_shift" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3NjE1NDcyNTZ9.hs6aK-IQEPS4y712deDQjA0Z0iZc5aCXGhleiLOabw0" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"new_end_time\": \"2025-10-26 13:45:00\", \"new_note\": \"\"}"

curl -X PUT "http://26.253.176.29:5555/employee/end_shift" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJleHAiOjE3NjE1NDY2Mzd9.hugkMYVcxGtjNRo7_yk4lVd3gmvv5AtjvdNrjkfgB7o" -H "accept: application/json" -H "Content-Type: application/json"

curl -X POST "http://26.253.176.29:5555/employee/edit_shift" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3NjE0NDkxNDB9.OhpBgXf_b8YeidMprL33OG-TOXYzg8y3DPZDQUMm-zo" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"new_end_time\": \"2025-10-25 12:32:00\", \"new_note\": \"No thing\"}"

curl -X GET "http://26.253.176.29:5555/manager/shifts" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3NjE1Mjk2NzV9.U5dQOLn3dc2PAhK2_Ob6aH3Chs1pZ8ebFUjtGm9quiQ" -H "accept: application/json" -H "Content-Type: application/json"

curl -X PUT "http://26.253.176.29:5555/manager/users/{1}/reset" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3NjE1Mjc0NzZ9.PSMyNXsQd9bqGg-6Xbqwjpi9cKKQ4Zyz6etPPPIqTU0" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"new_password\": \"vinh1255\"}"

curl -X GET "http://26.253.176.29:5555/manager/logs/{2025}/{10}/{26}" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NjE1MzcyNDF9.ZvMfCUyqDWzyH2Gcj5szCn8V__uuQEYkmQHBV8S5g28" -H "accept: application/json" -H "Content-Type: application/json"