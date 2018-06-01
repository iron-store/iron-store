
## command to create export file 
# -h name of the port that hosts the database locally 
# -d is the name of the database 
# -c is the name of the collection 
# -o is the name that the output file will have upon successful creation 
# notice the file needs to be explicitly named with a .json extension.

$ mongoexport -h localhost:27017 -d iron-store -c categories -o ironStoreCategories.json
$ mongoexport -h localhost:27017 -d iron-store -c orders -o ironStoreOrders.json
$ mongoexport -h localhost:27017 -d iron-store -c products -o ironStoreProducts.json
$ mongoexport -h localhost:27017 -d iron-store -c users -o ironStoreUsers.json



## command to import the created export file
# -h name if the host 
# -d is the database name on heroku
# -c name of the collection on heroku, should be the same as the one you have locally
# -u is again the name of the database (for some reason)
# -p is the password that heroku applies to access your database
# --file is the name of the file that you are trying to import into mLab 
# note that you have to run this command within the directory that has the file that you are trying to upload

$ mongoimport -h ds141320.mlab.com:41320 -d heroku_mfv8vlnh -c categories -u heroku_mfv8vlnh -p lhq02qtthcguq98o7rbm2bh2b3 --file ironStoreCategories.json
$ mongoimport -h ds141320.mlab.com:41320 -d heroku_mfv8vlnh -c orders -u heroku_mfv8vlnh -p lhq02qtthcguq98o7rbm2bh2b3 --file ironStoreOrders.json
$ mongoimport -h ds141320.mlab.com:41320 -d heroku_mfv8vlnh -c products -u heroku_mfv8vlnh -p lhq02qtthcguq98o7rbm2bh2b3 --file ironStoreProducts.json
$ mongoimport -h ds141320.mlab.com:41320 -d heroku_mfv8vlnh -c users -u heroku_mfv8vlnh -p lhq02qtthcguq98o7rbm2bh2b3 --file ironStoreUsers.json



## Link on heroku to the database
# you can access it in the settings page under config vars
# everything after the two slashes to the colon: name that heroku gives the database
# everything after the colon to the @ symbol: password to access the database
# everything after the @ symbol to the next forward slash symbol: name that heroku gives to the host for the database
# everything after the forward slash to the end is the name that Heroku gives to the database

mongodb://heroku_mfv8vlnh:lhq02qtthcguq98o7rbm2bh2b3@ds141320.mlab.com:41320/heroku_mfv8vlnh
