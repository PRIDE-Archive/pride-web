## PRIDE Submission Tool - Resubmission

The PRIDE Submission Tool is the main tool used to submit proteomics datasets to [PRIDE Archive](https://www.ebi.ac.uk/pride/). 
This tool has been implemented as a wizard, guiding submitters through a set of simple steps to complete each dataset submission.

[DOWNLOAD TOOL](https://ftp.pride.ebi.ac.uk/pub/databases/pride/resources/tools/submission-tool/latest/desktop/px-submission-tool.zip)

## Login Panel

The first step to submit a dataset to PRIDE Archive is to log into PRIDE using an existing account as shown:

</br>

![Login panel](../markdown/prideresubmission/files/login.png)

## Resubmission

Users are asked to click the below Resubmisison button presented at bottom of the screen.

</br>

![Resubmission](../markdown/prideresubmission/files/resubmission.png)

## Enable resubmission and load the private datasets

In this stage, please check on enable resubmission check box and click on the Load private datasets button.
The below drop-down list will be populated with private datasets of the user as shown below. Please select the dataset 
that needs to be updated

![Enable resubmision](../markdown/prideresubmission/files/select-dataset.png)

![Parent](../markdown/prideresubmission/files/parent.png)

> Once you click Ok, the dialog will be closed and presented with parent screen , please select next and proceed to the next screen.

## Add/Modify/Delete files

As shown below the next screen will be presented with previously submitted files below. 
* You get to choose DELETE/MODIFY option for the files from the drop-down list next to it. 
* You can add new files to the submission by clicking "Add Files" button in top right corner.

![fileList](../markdown/prideresubmission/files/fileList.png)

![modify-file](../markdown/prideresubmission/files/modify.png)

![add-file](../markdown/prideresubmission/files/add-file.png)

![add-files](../markdown/prideresubmission/files/add-files.png)

> Note: If you had selected MODIFY option for
the previously submitted files, you should add new file with same name else the tool will throw error and can't proceed

Once you have done with the changes you shall press Next button and proceed to next step.

## Checksum calculation

If you are adding new files to the submission you have the option of calculating checksum for the new files added. Please
press yes or no if you want to calculate checksum. It is highly recommended to calculate checksum but if the file is very large you can skip it
by pressing no. Please press Next button after that.

![Checksum](../markdown/prideresubmission/files/checksum.png)

## Submission summary

The next screen will show up the summary of new files added and option selected for the previously submitted files.
Look through the summary and if everything seems fine , please accept the PRIDE dataset policy and press submit button.
You will be presented with a dialog box to save submission.px. Please save in a new folder separately corresponding to the resubmisison.
Once saved the submission will start to transfer the submission.px,newly added files if any and corresponding checksum.txt.

![Summary](../markdown/prideresubmission/files/summary.png)

## Successful submission

Once the transfer has been completed you would be presented with Success message and also the submission reference ticket id.
Can provide a feedback by selecting the smiley and clicking on the Feedback button. Once done click on the finish button.

![Submission success](../markdown/prideresubmission/files/success.png)