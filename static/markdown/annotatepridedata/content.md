## Welcome to Pride Annotation System!

We have four steps to finish our [Annotation](http://wwwdev.ebi.ac.uk/pride/annotation): 

- Dataset Search
- Check Metadata
- Experimental Design 
- Annotate

Before go for the annotation, please log in the system first. If you do not have a valid account, then sign up. After you get an account, you could feel free to do your annotation. More details will introduced in this documents below.

![Log In](../static/markdown/annotatepridedata/image/login.jpg)

![Sign Up](../static/markdown/annotatepridedata/image/signup.jpg)

## Dataset Search

You need to search the project in our database and find one you would like to do the annotation. More specifically:

 1. Input keyword
 2. Choose facet
 3. User "**Enter**" to add more than one keyword
 4. Click "**Search**"
 5. Choose the project to annotate

The screenshot shows you could use our search function.

![search](../static/markdown/annotatepridedata/image/search.jpg)

## Check Metadata 

In this step, you could go through the details about the project such as project description, properties and msRun files.

If you would like to continue, just click "**Next**" button at the bottom.

![check](../static/markdown/annotatepridedata/image/check.jpg)

## Experimental Design

In this page, you could choose the type of the experiment (**Required**). Also, the sample number and fraction number is needed for the following step.

After you finished,  click "**Next**" button at the bottom.

![check](../static/markdown/annotatepridedata/image/sample.jpg)

## Annotate

This is the final step of our annotation as well as the most complex one. Please go through this document carefully.

The page has two main tables: **Sample Table** and **File Table** which have been shown in the screenshot.

The number of the row from  **Sample Table** is generated according to the **sample number** in the Step 3.

The number of the row from  **File Table** is generated according to the multiplication by **sample number** and **Fraction number**  in the Step 3.

In this screenshot, we have two rows of the **Sample Table** as the  **sample number** is 2 and 4 rows of the **File Table** as the  **Fraction number** is also two (2*2 = 4）

![check](../static/markdown/annotatepridedata/image/annotatetable.jpg)

### 1. Sample Table
We have preset several columns for this table: 
- Accession: 
- Organism:
- Organism Part:
- Disease:
- Cell Type: 
- Developmental Stage:
- Strain (**Not required**): this column could be removed by the "**remove**" button shown in the following screen shot.
- Sex:
- Individual Accession:

#### Add property
From the screenshot, we could find a button called "**Add property**" .

Once you click this button, it will show you a table modal which allow you to add more columns to the **Sample Table** accordingly.

![check](../static/markdown/annotatepridedata/image/addrow.jpg)

#### Add sample
From the screenshot, we could find a button called "**Add sample**" . All the -   manual added columns is  "**Not required**" which means you could remove this column by the "**remove**" button.

Once you click this button, it will add more rows to the **Sample Table** accordingly. If you could see the  "**remove**" button in the "**Accession**" column which means this row could be removed. For the Sample Table, one row is needed at least.

![check](../static/markdown/annotatepridedata/image/sampletable1.jpg)

#### Functions

1. fill the input
In the sample data, we could input the annotation content by  "**self-fill**" or  "**auto-fill**".
Focus on one input and try to type some keyword. The default "**auto-complete**" function will be triggered. Some recommended word will be shown in a list. You could try one of them to be your annotation content 

2. apply-to-all
When the recommended word is shown, you could use the "**apply-to-all**" button (arrow-down) to fill the whole column with this value ( "**apply-to-all**" button will fill the whole column of the  **Sample Table** as well as the **File Table** which will be explained in the next section.)

3. remove-to-all
In the first row of **Sample Table**, all the columns' name is shown there. On the left of each column name, there is a small button which could remove all the data for this whole column including **Sample Table** and **File Table**.

4. move column
If you have your own preference of the order of the column. You could position your mouse onto the first row which contains the column name and hold the mouse to move this column. Once you feel happy, just release the mouse. The column will be positioned in the new postion.

![check](../static/markdown/annotatepridedata/image/sampletable2.jpg)

### 2.File Table


In the **File Table**, we have two parts: copy of the **Sample Table** on the left and **msRun Table** on the right. For the copy of the **Sample Table**, some unnecessary columns have been removed to leave more space for **msRun Table**. This "copy" causes the "**apply-to-all**" function will apply to the column of the  **Sample Table** as well as the **File Table**.

For the copied **File Table**, we do not need to put extra concern. We only need to focus the right **msRun Table**. We have preset several columns for this table: 
- FractionID: 
- Label:
- LabelReagent:
- MSRun:

For the "Label" and "LabelReagent", there is nothing special to emphasize as it is just like the columns in the  **Sample Table**. For the "MSRun" column, it has brand new feature. 

#### Link raw file

If you click the button "**Edit**" in the "MSRun" column. One drawer will pop up from the right side. In this drawer, it lists all the annotation files for this project you are annotating. Then you could select one of the files to add to this row in the **msRun Table**. After you click "**Ok**" button. The previous "**Edit**" button will be changed to a green "**Finish**" button. You could hover your mouse onto the "**Finish**" button to see the file name you just added or you could click the  **remove** the button to clear the file.

![check](../static/markdown/annotatepridedata/image/linkfile.jpg)

![check](../static/markdown/annotatepridedata/image/msruntable.jpg)


### Extra Annotation Functions

In order to make the annotation system more friendly, we add some more features into the system.

#### Save uncompleted annotation

If you cannot finish the annotation, a saving mechanism could help you to save all the current state into your localstorage (A web-based saving method) by clicking **save** button at the bottom. Next time, when you open the annotation system again, a pop-up modal will ask you if you would like to continue with the uncompleted annotation. If you click **OK**, it will direct you to the last **annotate** step of your last annotation project. If you click **Cancel**, the localstorage will be cleared and you will be directed to the first **search** step of the annotation.

![check](../static/markdown/annotatepridedata/image/saveannotation.jpg)

![check](../static/markdown/annotatepridedata/image/continueannotation.jpg)

#### Submit annotation

Once you think you have finished the annotation information in the **Sample Table** and the **File Table**, you could click the **submit** button at the bottom. If some **required** content you have not filled up, all these content's frame will be turned in to **red** to remind you have to finish them before submit. Once you finished all the **required** content, the submission will be successful and you will be directed to the first **search** step of the annotation.
