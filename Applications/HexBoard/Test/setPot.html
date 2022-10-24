var vv=new Array(6);
var tt=new Array(6);
function SetPot(ii, jj, kk, cc, llevel)
{ Upd[ii][jj]=false;
  Bridge[ii][jj][kk]=0;
  if (Fld[ii][jj]==-cc) return(0);
  var ll, mm, ddb=0, nn, oo=0, dd=140, bb=66;
  if (cc!=ActiveColor) bb=52;
  vv[0]=PotVal(ii+1,jj,kk,cc);
  vv[1]=PotVal(ii,jj+1,kk,cc);
  vv[2]=PotVal(ii-1,jj+1,kk,cc);
  vv[3]=PotVal(ii-1,jj,kk,cc);
  vv[4]=PotVal(ii,jj-1,kk,cc);
  vv[5]=PotVal(ii+1,jj-1,kk,cc);
  for (ll=0; ll<6; ll++)
  { if ((vv[ll]>=30000)&&(vv[(ll+2)%6]>=30000))
    { if (vv[(ll+1)%6]<0) ddb=+32;
      else vv[(ll+1)%6]+=128; //512;
    }
  }  
  for (ll=0; ll<6; ll++)
  { if ((vv[ll]>=30000)&&(vv[(ll+3)%6]>=30000))
    { ddb+=30;
    }
  }
  mm=30000;
  for (ll=0; ll<6; ll++)
  { if (vv[ll]<0)
    { vv[ll]+=30000;
      tt[ll]=10;
    }
    else tt[ll]=1;
    if (mm>vv[ll]) mm=vv[ll];     
  }
  nn=0;
  for (ll=0; ll<6; ll++)
  { if (vv[ll]==mm) nn+=tt[ll];
  }
  if (llevel>1)
  { Bridge[ii][jj][kk]=nn/5;
    if ((nn>=2)&&(nn<10)) { Bridge[ii][jj][kk]=bb+nn-2; mm-=32; }
    if (nn<2)
    { oo=30000;
      for (ll=0; ll<6; ll++)
      { if ((vv[ll]>mm)&&(oo>vv[ll])) oo=vv[ll];     
      }
      if (oo<=mm+104) { Bridge[ii][jj][kk]=bb-(oo-mm)/4; mm-=64; }
      mm+=oo;
      mm/=2;
    }
  }
  
  if ((ii>0)&&(ii<Size-1)&&(jj>0)&&(jj<Size-1)) Bridge[ii][jj][kk]+=ddb;
  else Bridge[ii][jj][kk]-=2;
  if (((ii==0)||(ii==Size-1))&&((jj==0)||(jj==Size-1))) Bridge[ii][jj][kk]/=2; // /=4
  if (Bridge[ii][jj][kk]>68) Bridge[ii][jj][kk]=68; //66
  
  if (Fld[ii][jj]==cc)
  { if (mm<Pot[ii][jj][kk]) 
    { Pot[ii][jj][kk]=mm;
      SetUpd(ii+1,jj,cc);
      SetUpd(ii,jj+1,cc);
      SetUpd(ii-1,jj+1,cc);
      SetUpd(ii-1,jj,cc);
      SetUpd(ii,jj-1,cc);
      SetUpd(ii+1,jj-1,cc);
      return(1);
    }  
    return(0);
  }
  if (mm+dd<Pot[ii][jj][kk]) 
  { Pot[ii][jj][kk]=mm+dd;
    SetUpd(ii+1,jj,cc);
    SetUpd(ii,jj+1,cc);
    SetUpd(ii-1,jj+1,cc);
    SetUpd(ii-1,jj,cc);
    SetUpd(ii,jj-1,cc);
    SetUpd(ii+1,jj-1,cc);  
    return(1);
  }  
  return(0);
}
