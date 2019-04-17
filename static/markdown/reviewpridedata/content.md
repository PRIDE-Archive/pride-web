## Reviewing manuscripts using PRIDE data

When a user submits the data to PRIDE Archive, the data is **private** by default and a reviewer account is created to be shared with journal reviewers and editors. Currently, PRIDE data can be reviewed in two different ways depending of the type of the dataset **Partial** or **Complete**.

## Finding and Download private data

The current best way to download and review the PRIDE Archive data is using the [Pride Inspector Toolsuite](./prideinspector). Users and reviewers can use the provided account to log in to PRIDE:

![Reviewer login](../static/markdown/reviewpridedata/files/reviewer-login.png)

After log-in, a panel listing the dataset (private) under a particular reviewer account will be accessible:

</br>

![Datasets Access](../static/markdown/reviewpridedata/files/private-datasets.png)

Finally, a panel with all the _files_ in the datasets are shown to be downloaded:

![Dataset files](../static/markdown/reviewpridedata/files/private-files.png)

## Reviewing Partial Submissions

Private **PARTIAL** submissions only contain [RAW Files](./pridefileformats#search_files) and [SEARCH Files](./pridefileformats#search_files) which can be read only by specific software tools such as Mascot, MaxQuant, etc. [Please Read](./pridefileformats)

## Reviewing Complete Submissions

For **COMPLETE** submissions the corresponding mzIdentML or mzTab files [RESULT Files](./pridefileformats#result_files) can be downloaded using [PRIDE Inspector](./prideinspector).

### Checking the identified spectra

Users can check any relevant peptide identifications in the [RESULT Files](./pridefileformats#result_files) and visualize the corresponding annotated mass spectra.

</br>

![Peptide Table](../static/markdown/prideinspector/files/peptideTable2.png)

The **fragment ion table** can be used to visualise the differences between the theoretical identified fragment ions and the experimental ones:

</br>

![Fragmentation table](../static/markdown/reviewpridedata/files/fragmenttable.png)

In addition, users can check the **protein coverage** and protein sequence identified for all the identified proteins:

![Fragmentation table](../static/markdown/prideinspector/files/proteinSequence.png)

You can check how to use [PRIDE Inspector here](./prideinspector).
