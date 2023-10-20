### PRIDE Submission Tool does not launch

 - Make sure you have the following requirements before you run the programme 
 
 - You should unzip the zipped file and run px-submission-tool-2.4.xx.jar, not the zipped file
 
 - Make sure you have not put the tool in a directory with a blank space or similar
 
 - Please open a command line window and run the following command to check your java version:
 
 	java -version
 	
### For MAC users
 
 Check for the old version of JDK installed even though it is updated to the new version of JRE. Re-locate the unzipped px-submission-tool-2.4.xx folder from the desktop to the main Mac directory (this overcame the “unable to access” error).
  
 For troubleshooting, please open your command-line and run the following commands and check your environments are correctly set up.
 
  - java -version to check you have java installed. You should be able to see something like : java version "1.8.0_191". If you get an error message: java -version is not recognized as an internal or external command ... This means you have not set up your Java properly. If so, please install Java and restart the machine. You need to have a 1.8 or above java version.
  - echo $JAVA_HOME to check you have set up the environment variable properly.
  - cd <path/to/the/px-submission-tool/directory> Navigate to your submission tool folder
  - java -jar px-submission-tool-<version number>.jar to open the tool. Please replace the version number.


### PRIDE Submission Tool stuck at checksum stage

There are several factors that may cause the PRIDE Submission Tool to encounter delays when calculating checksums for each file:

- Ensure that you possess write access to the directory where you're utilizing the tool, as the checksum file is generated within that directory.

- In cases where your files are big or your submission comprises a significant number of files, the checksum calculation process may take a considerable amount of time. We kindly ask for your patience while the checksum calculation completes.


### How to switch the PRIDE Submission Tool from Aspera to FTP?

Should there be problems with the Aspera upload submitters can switch to the slower FTP file transfer protocol by changing the ‘px.upload.protocol = aspera’ line to ‘px.upload.protocol = ftp’ in the plain config.props text file located in the ‘config’ subdirectory in the PRIDE Submission Tool’s working directory.

### Aspera does not connect

Ensure that the following port allows outbound traffic on your router, firewall, or network: TCP 33001.

Aspera connects, but transfers 0% of my files
Ensure that the following port allows outbound traffic on your router, firewall, or network: UDP 33001.

### I cannot do log-in with the PRIDE Submission tool

Please confirm that you can log into the main PRIDE website with your account:
[http://www.ebi.ac.uk/pride/archive/login](http://www.ebi.ac.uk/pride/archive/login)
Perhaps you can try changing your password, and then trying again.

### How to export the summary and checksum file with the PRIDE Submission Tool?

For some bulk submissions or for direct Aspera upload, the submission.px and checksum files can still be generated and exported with the PRIDE Submission Tool.

You can generate them from the PRIDE submission Tool. You need to install the latest PRIDE submission Tool from the PRIDE web page. Once you upload your data then at the 4th step when the checksum step passes, the checksum.txt file will automatically be downloaded to your PRIDE submission Tool folder.
Again you need to follow the PRIDE submission Tool till the 9th step, 
there in the top right corner you can find the summary/submission.px file which you can export.
You don't have to go further to submit the data. See screenshots -


![checksum](../markdown/tooltroubleshooting/files/checksum.png)
![checksum1](../markdown/tooltroubleshooting/files/checksum1.png)
![checksum2](../markdown/tooltroubleshooting/files/checksum2.png)

### How and where to check the log files of PRIDE submission tool

The log file for the submission tool (submission.log) will be present in the log folder inside the px-submission-tool folder.
Most of the time the log file will show the common errors in the tool while execution which can be corrected manually, if not ,
if there is any issue in submitting or using the PRIDE submission tool you can 
contact the PRIDE support team by attaching the log file.

### How to add modification that is not present in the list of the PRIDE submission tool

Usually the drop-down list would consist of all the common modifications used . If not so you can traverse to the bottom of the list and select Others.
That would open up the OLS Dialog where you can search by Ontology names or id and select the desired modifications.




