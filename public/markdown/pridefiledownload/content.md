## PRIDE Data Download

Once a given dataset has been publicly released it is accessible to all PRIDE users. The corresponding files can be downloaded from PRIDE using multiple mechanisms: 

- **1) HTTPS download**: Data files can be downloaded using the HTTPS protocol. Each dataset directory is accessible via a unique URL (e.g. https://ftp.pride.ebi.ac.uk/pride/data/archive/2012/03/PXD000001/).
- **2) FTP download**: Data files can be downloaded using the FTP protocol. Each dataset directory is accessible via a unique URL (e.g. ftp://ftp.pride.ebi.ac.uk/pride/data/archive/2012/03/PXD000001/).
- **3) Aspera download**: Data files can also be downloaded using the Aspera file transfer protocol. Each dataset directory is accessible via a unique URL.
- **4) PRIDE Streaming API (Application Programming Interface)**: Finally, data files can be streamed using the pride-archive-downloader service (e.g. https://www.ebi.ac.uk/pride/ws/archive-file-downloader/swagger-ui/index.html). 

## 1) Downloading Data using HTTPS

The most common way to download files is using the HTTPS protocol. In the dataset page one can find the **Project FTP** link. This link will take users to the dataset folder in the FTP server. Also, one will find the **FTP** for each file in the dataset page.

![HTTP Download](../markdown/pridefiledownload/image/dataset-files.png)

The structure of each Project FTP folder is as follows:

    https://ftp.pride.ebi.ac.uk/pride/data/archive/<year>/<month>/<accession>

And the structure of each file is as follows:

    https://ftp.pride.ebi.ac.uk/pride/data/archive/<year>/<month>/<accession>/<filename>

Different tools can be used to download files using the HTTPS protocol. For example, one can use the `wget` command line tool to download files. 

    wget https://ftp.pride.ebi.ac.uk/pride/data/archive/2012/03/PXD000001/TMT_Erwinia_1uLSike_Top10HCD_isol2_45stepped_60min_01.raw


## 2) Downloading Data using FTP

The other most common way and/or easiest way to download files in bulk is using FTP clients. 

Concerning FTP client programs, we recommend using WinSCP (Windows only) or FileZilla (for all OS). One can download one of them from these links:

- WinSCP : http://winscp.net/eng/download.php
- FileZilla: http://filezilla-project.org/download.php

Eg: One can download files through a web browser https://ftp.pride.ebi.ac.uk/pride/data/archive/2018/04/PXD005011/
    or use FTP tools like FileZilla 

    #### FileZilla
    Host:ftp.pride.ebi.ac.uk
    Path: pride/data/archive/<year>/<month>/<accession>
    Username can be empty or in somecases, one need to explicitly provide "anonymous" as the username.

## 3) Downloading Data using Aspera

Aspera is a client-server protocol for fast and secure file transfer. It is a high-speed file transfer protocol that uses a client-server model to transfer files. It is designed to transfer large files over long distances. **Aspera is the fastest way to donwload data from PRIDE.**

### 3.1) Using the Aspera client Tool

The Aspera ascp command line client can be downloaded [here](https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm%7EOther%20software&product=ibm/Other+software/IBM+Aspera+Connect&release=4.1.3&platform=All&function=all).

First, one needs to download and install the installers specific to your machine. The location of the 'ascp' program in the filesystem is described next:

- `Mac`: On the desktop go to `cd ~/Applications/Aspera\ Connect.app/Contents/Resources/` there one will see the command line utilities where one is going to use 'ascp'.
- `Windows`: The downloaded files are a bit hidden. For instance in Windows 7 the ascp.exe is located in the users home directory in: `AppData\Local\Programs\Aspera\Aspera Connect\bin\ascp.exe`.
- `Linux`: It should be in the user's home directory, `cd /home/username/.aspera/connect/bin/`. There one will see the command line utilities where one is going to use 'ascp'.
 
The below command has to be used after the client has been installed:

    ascp -TQ -P33001 -l 100M -i ~/Applications/Aspera\ Connect.app/Contents/Resources/asperaweb_id_dsa.openssh prd_ascp@fasp.ebi.ac.uk:/pride/data/archive/2017/05/PXD005207/CDPK1_TP_10_R5.raw ~/

**Important Note**: `~/Applications/Aspera\ Connect.app/Contents/Resources/asperaweb_id_dsa.openssh` is the  private key file provided after installing Aspera, and `/pride/data/archive/2017/05/PXD005207/CDPK1_TP_10_R5.raw` is the public file path for the file. 

### 3.2) Using the Aspera Docker Image

Aspera client can also be executed using the [IBM aspera client docker container](https://hub.docker.com/r/ibmcom/aspera-cli). A pre-requisite to use this container is to have Docker installed in your machine [help here](https://docs.docker.com/install/).

The docker image can be downloaded from [here](https://hub.docker.com/r/ibmcom/aspera-cli/) using the following command:

    docker pull ibmcom/aspera-cli

To download one file, the Docker image can be executed using the following command:

        docker run -v /user/data/folder:/data  ibmcom/aspera-cli ascp -i /home/aspera/.aspera/cli/etc/asperaweb_id_dsa.openssh -TQ -P33001 prd_ascp@fasp.ebi.ac.uk:/pride/data/archive/2017/02/PXD004683/20150820_Haura-Pilot-TMT2-bRPLC06-2.raw  /data

**Important Note**: `/user/data/folder` is the local folder where the file will be downloaded. `/home/aspera/.aspera/cli/etc/asperaweb_id_dsa.openssh` is the  private key file provided after installing Aspera, and `/pride/data/archive/2017/02/PXD004683/20150820_Haura-Pilot-TMT2-bRPLC06-2.raw` is the public file path for the file.

## 4) Downloading Data using the PRIDE Streaming API

The PRIDE Streaming API is a RESTful API that allows users to download data from PRIDE. The API only has one endpoint that can be used to download files. The endpoint is:

    https://www.ebi.ac.uk/pride/ws/archive-file-downloader/files/s3/<project accession>/<filename>

The API can also be used to download files using the following command line tool `wget`:

    wget https://www.ebi.ac.uk/pride/ws/archive-file-downloader/files/s3/PXD000001/TMT_Erwinia_1uLSike_Top10HCD_isol2_45stepped_60min_01.raw

## pridepy Python client 

The PRIDE Team has developed a [python client library](https://github.com/PRIDE-Archive/pridepy) for the PRIDE Rest API, including functionalities for dataset and file searching. The library can also be used to download files from PRIDE. The details are provided [here](https://github.com/PRIDE-Archive/pridepy). 

## Benchmarking data downloads 

We have done some benchmarking studies to compare the different ways of downloading files from PRIDE.

Below is the plot of different download methods tested in UK and from US machines

It is a average of times tested for a file of size 1GB.

<img height="300" src="../markdown/pridefiledownload/image/download-plot.png" width="5000"/>
