## Additional FAQ

### How can I add/edit metadata to my PRIDE dataset?

- You can add title, description, sample, and data processing protocols, and contact from your PRIDE account. You need to log in to PRIDE web and go to profile, select your private dataset, and then select ‘Edit’ tab from a right-hand corner of the screen. In the end, save the changes.
- For another metadata change, you must request PRIDE support team(pride-support@ebi.ac.uk). You must provide all the details before you request to change. You can find details of metadata at - https://www.ebi.ac.uk/ols4

### How should I name my files 
It is recommended to name your file in a self descriptive way, for instance : experimentname_samplename_replicates_fractions. We only accept A-Za-z0-9_. in file names. Please remove any other special characters from your file name.

### How can I change the submitter’s details and contact?

Login to your PRIDE web account, go to your profile and select your private dataset. On the right-hand corner of the screen, you can see the ‘Transfer Ownership’ tab. There you can provide your new (submitter’s)email id which must be registered with PRIDE.

### How do I publish my private dataset in PRIDE?

- Login to your PRIDE web account and go to profile and select your private dataset. On the right-hand corner of the screen, you can see the ‘Publish’ tab. You can provide the details there.
- Please fill in either PubmedID or DOI by selecting the correct option from dropdown and submit
- If the PubmedID/DOI doesn't exist in EuroPMC or if it's a preprint, the request to make it public will fail. In such cases, it's better to omit those fields when you request to make the dataset public.

### Can I submit my clinically sensitive data to PRIDE which has controlled access?

For now, NO, but in the future. Please follow PRIDE on Twitter or PRIDE web for updates.

### What is the current version of PRIDE submission tool?

2.8.0

### I am not able to use PRIDE Inspector tool?

We do not support PRIDE inspector tool anymore. It can still be used as a standalone tool for visualization.

### How can I change PI’s email id

You can change the name and email id of the PI by following the steps below -

* Login with registered submitter email.
* Go to your profile and select the dataset you wish to change the PI information.
* Click the edit button on the right.
* Change the information and click save.

### Can I add PubMed/doi after publishing my dataset

Yes, you can ask PRIDE support (pride-support@ebi.ac.uk)

### I am stuck at a checksum calculation step in PX tool

Please check for the permission of the folder where you have your PRIDE submission tool. PRIDE tool needs it write permission to generate checksum file.

### I am unable to login to PRIDE submission tool

If you can login to PRIDE web then you should be able to login to submission tool. Try deleting the history/cache and reinstall the submission tool.

### How to change Aspera to FTP manually on px submission tool

PX tool has the option on the step 9 to change Aspera to FTP. If you are stuck/ failed with the submission of the dataset via Aspera, click the back option and then click on FTP and submit the data again.

### Where can I find the log file in submission tool

Log file can be found inside the submission tool ->log folder

### How to export checksum and submission.px files?

Once you start uploading your data with submission tool, it automatically will generates and exports the checksum.txt in submission tool folder. You can export submission.px at the last step in submission tool.

### Submission tool is not listing the metadata I want for my dataset

If it is not present in a submission tool drop down, select ‘other’ and it will connect you to ontology GUI where you can search for your metadata. 

### How to update proxy settings in submission tool

The proxy settings for the submission tool can be changed or updated in config.properties file present in the px-submission-tool folder.
Please update the below lines to relevant proxy host and port details, uncomment the line by removing the #, save the file and restart the submission tool. 
   ``` 
    #  px.proxy.host = localhost
    #  px.proxy.port = 8080

