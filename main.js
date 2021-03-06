window.onload=main;

var igview;

function main()
{
    igview=document.querySelector("ig-view");

    var argv=window.location.hash.split("#");

    if (argv.length>1)
    {
        getAlbum(argv[1],(r)=>{
            if (!r.success)
            {
                return;
            }

            // console.log(r);
            var imgs=[];
            for (var x=0,l=r.data.length;x<l;x++)
            {
                if (r.data[x].gifv)
                {
                    imgs.push(r.data[x].gifv.slice(0,-1));
                }

                else
                {
                    imgs.push(r.data[x].link);
                }
            }

            igview.loadImgs(imgs);
        });

        getAlbumInfo(argv[1],(r)=>{
            document.title=r.data.title;
        });
    }
}

/*string url: imgur album tag string thing
  function callback(object response): callback function
    object response: result album*/
function getAlbum(url,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",`https://api.imgur.com/3/album/${url}/images`);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response));
        }
    };

    r.setRequestHeader("Authorization","Client-ID 28bf65f46c4de3c");
    r.send();
}

//same input/return style as getAlbum()
function getAlbumInfo(url,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",`https://api.imgur.com/3/album/${url}`);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response));
        }
    };

    r.setRequestHeader("Authorization","Client-ID 28bf65f46c4de3c");
    r.send();
}

function viewLimits()
{
    var r=new XMLHttpRequest();
    r.open("GET","https://api.imgur.com/3/credits");

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            console.log(r.response);
        }
    };

    r.setRequestHeader("Authorization","Client-ID 28bf65f46c4de3c");
    r.send();
}

//manual load a list of links. since its not imgur, things will be broken
function manualLoad(urllist)
{
    urllist=urllist.split("\n");

    //clean up last line if it was empty
    if (urllist[urllist.length-1].length<30)
    {
        urllist.pop();
    }

    igview.loadImgs(urllist);
}