@echo off
set dir=%1

if "debug\launched.dat" not exist goto first
if "debug\launched.dat" exist goto begin 
{
    :first
        cd "%dir%"
        echo launched_prompt=0 > "debug\launched.dat"
        npm install create-react-app react-app
        cd react-app
        npm start
    :begin
        cd "%dir%"
        cd react-app
        npm start
}