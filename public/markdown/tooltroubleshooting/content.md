 - **PX Submission Tool does not launch**
 
 
 - Make sure you have following requirements before you run the programme - 
 
 - You should unzip the zipped file and run px-submission-tool-2.4.xx.jar, not the zipped file
 
 - Make sure you have not put the tool in a directory with a blank space or similar
 
 - Please open a command line window and run following command to check your java version:
 
 	java -version
 	
 - **For MAC users**
 
 Check for the old version of JDK installed even though it is updated to the new version of JRE. Re-locate the unzipped px-submission-tool-2.4.xx folder from the desktop to the main Mac directory (this overcame the “unable to access” error).
  
 For troubleshooting, please open your command-line and run following commands and check your environments are correctly set up.
 
  - java -version to check you have java installed. You should be able to see something like : java version "1.8.0_191". If you get an error message: java -version is not recognized as an internal or external command ... This means you have not set up your Java properly. If so, please install Java and restart the machine. You need to have a 1.8 or above java version.
  - echo $JAVA_HOME to check you have set up the environment variable properly.
  - cd <path/to/the/px-submission-tool/directory> Navigate to your submission tool folder
  - java -jar px-submission-tool-<version number>.jar to open the tool. Please replace the version number.

- **PX Submission Tool stuck at checksum stage**

If you don't have write access to the folders you are running the tool from. You can check by creating  a file in that folder and check. For example, if you have the submission tool on the C drive with Windows 10, in the Program Files directory, that is apparently protected and the install tool cannot write there. If you put the install tool into another directory with no read/write permissions (apparently), then it all works fine. I noticed when starting the tool when it was in the directory that could not write, there was an error box when the tool first started, but there was no text in that box or indication what the error was. I supposed that could be enhanced to indicate to people that write permissions are such that the upload tool cannot work.

- **How to switch the PX Submission Tool from Aspera to FTP?**

Should there be problems with the Aspera upload submitters can switch to the slower FTP file transfer protocol by changing the ‘px.upload.protocol = aspera’ line to ‘px.upload.protocol = ftp’ in the plain config.props text file located in the ‘config’ subdirectory in the PX Submission Tool’s working directory.

- **Aspera does not connect**

Ensure that the following port allows outbound traffic on your router, firewall, or network: TCP 33001.

Aspera connects, but transfers 0% of my files
Ensure that the following port allows outbound traffic on your router, firewall, or network: UDP 33001.

- **I cannot do log-in with the PX Submission tool**

Please confirm that you can log into the main PRIDE website with your account:
[http://www.ebi.ac.uk/pride/archive/login](http://www.ebi.ac.uk/pride/archive/login)
Perhaps you can try changing your password, and then trying again.

- **How to export the summary and checksum file with the PX Submission Tool?**

For some bulk submissions or for direct Aspera upload, the summary.px and checksum files can still be generated and exported with the PX Submission Tool, although the files won't actually be uploaded with the tool itself.

You can generate them from the PX Tool. You need to install the latest PX Tool from the PRIDE web page. Once you upload your data then at the 4th step when the checksum step passes, the checksum.txt file will automatically be downloaded to your PX Tool folder. Again you need to follow the PX Tool till the 9th step, there on the top right corner you can find the summary/submission.px file which you can export. You don't have to go further to submit the data. See screenshots -


![checksum](../markdown/tooltroubleshooting/files/checksum.png)
![checksum1](../markdown/tooltroubleshooting/files/checksum1.png)
![checksum2](../markdown/tooltroubleshooting/files/checksum2.png)


