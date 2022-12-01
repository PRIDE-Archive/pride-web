## Pride Data Download

Once your submission files have been published it will be publically accessible to the users of pride.
There are multiple ways to download your files from PRIDE repository

## Downloading individual Files from browser via HTTPS

Eg. To download files of dataset PXD005877.

Search in [PRIDE Web](https://www.ebi.ac.uk/pride/archive?sortDirection=DESC&page=0&pageSize=20)
or can be directly accessed from below path in browser providing the publication year , month and accession

    https://ftp.pride.ebi.ac.uk/pride/data/archive/2022/04/PXD005877/
    https://ftp.pride.ebi.ac.uk/pride/data/archive/<year>/<month>/<accession>


## FTP

The other most common way or easiest way to download files in bulk is using ftp clients. 

Concerning FTP client programs, we recommend using WinSCP (Windows only) or FileZilla (all OS). You can download one of them from these links:
- WinSCP : http://winscp.net/eng/download.php
- FileZilla: http://filezilla-project.org/download.php


Eg: Can traverse through browser https://ftp.pride.ebi.ac.uk/pride/data/archive/2018/04/PXD005011/
    or use ftp tools like filezilla 

    #### Filezilla
    Host:ftp.pride.ebi.ac.uk
    Path: pride/data/archive/<year>/<month>/<accession>
    Username can be empty or somecases explicitly provide username as "anonymous"

## Aspera

This is faster and secure way than ftp.

The Aspera ascp command line client can be downloaded [here](https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm%7EOther%20software&product=ibm/Other+software/IBM+Aspera+Connect&release=4.1.3&platform=All&function=all).
Download and install the installers specific to your machine

The location of the 'ascp' program in the filesystem:

- Mac: On the desktop go `cd ~/Applications/Aspera\ Connect.app/Contents/Resources/` there you'll see the command line utilities where you're going to use 'ascp'.

- Windows: The downloaded files are a bit hidden. For instance in Windows 7 the ascp.exe is located in the users home directory in: `AppData\Local\Programs\Aspera\Aspera Connect\bin\ascp.exe`

- Linux: It should be in your user's home directory, `cd /home/username/.aspera/connect/bin/` there you'll see the command line utilities where you're going to use 'ascp'.

    
Use the below command after you installed the client.

    ascp -TQ -P33001 -l 100M -i ~/Applications/Aspera\ Connect.app/Contents/Resources/asperaweb_id_dsa.openssh prd_ascp@fasp.ebi.ac.uk:/pride/data/archive/2017/05/PXD005207/CDPK1_TP_10_R5.raw ~/

~/Applications/Aspera\ Connect.app/Contents/Resources/asperaweb_id_dsa.openssh is the  private key file provided after installing aspera.

/pride/data/archive/2017/05/PXD005207/CDPK1_TP_10_R5.raw is the public file path for the file

## pridepy python client 

This is python client library for PRIDE Rest API.

The installation and usage instruction are provided [here](https://github.com/PRIDE-Archive/pridepy)



