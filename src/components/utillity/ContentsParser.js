class User { 

    // 국가코드는 2글자로 대문자 단독사용 안되고 아래의 규칙을 따라야함.
    // 두자리국가코드+L => 해당언어 발음 표기
    // 두자리국가코드+M => 해당언어 번역 표기


    constructor(name) {
        
        this.original_lyric = 0;
        this.save_lyric = 0;
        this.throwToServer_lyric = 0;

        // 인포파서
        this.parser_info =0;

        this.parser_title =0;
        this.parser_oTitle =0;
        this.parser_composer =0;
        this.parser_singer =0;
        this.parser_lyric =0;

        this.parser_pSong=0;
        this.parser_release =0;
        this.parser_site =0;
        this.parser_oSite =0;

        // 가사파서
        this.timestemp_sec_start = [];
        this.timestemp_sec_end   = [];
        this.original = [];
        this.lexicon = [];
        this.translated = [];

        this.size = 0;

        this.position = 0;

    }


    timeConverter_from_sec(second){
        let minuite = parseInt(second/60);
        let secondss = (second%60).toFixed(3);
        let minuite_string = ""
        let second_string = ""
        if(minuite<10  ) minuite_string = "0" + minuite_string;
        if(minuite<100 ) minuite_string = "0" + minuite_string;
        if(minuite<1000) minuite_string = "0" + minuite_string;
        if(secondss<10) second_string = "0";
        minuite_string = minuite_string + minuite;
        second_string = second_string + secondss;
        //console.log("연산",minuitesdas+":"+asfadfa+secondss);
        return minuite_string+":"+second_string
    }


    lyricPositionPrev(){
        let self = this;
        if(self.position>0) self.position = self.position - 1 ;
        return self.position
    }
    lyricPositionNext(){
        let self = this;
        if(self.position<self.size) self.position = self.position + 1 ;
        return self.position
    }
    lyricPositionZero(){
        let self = this;
        self.position = 0;
        return self.position
    }


    lyricReadNow(){

        let self = this;
        
        return ([
            self.timestemp_sec_start[self.position], 
            self.timestemp_sec_end[self.position],
            self.original[self.position], 
            self.lexicon[self.position], 
            self.translated[self.position]
        ]);
        
    }
    lyricReadAll(){
        let self = this;
        let asfadsf=[];
        let cou = 0;
        while(self.size>cou){
            //console.log(self.timestemp_sec_start[cou])
            asfadsf.push([
                self.timestemp_sec_start[cou], 
                self.timestemp_sec_end[cou],
                self.original[cou], 
                self.lexicon[cou],    //012345678910
                self.translated[cou], //0000:00.000
                (Number(self.timestemp_sec_start[cou].substr(0, 4))*60  )+
                (Number(self.timestemp_sec_start[cou].substr(5, 2))     )+
                (Number(self.timestemp_sec_start[cou].substr(8, 3))/1000),
                (Number(self.timestemp_sec_end  [cou].substr(0, 4))*60  )+
                (Number(self.timestemp_sec_end  [cou].substr(5, 2))     )+
                (Number(self.timestemp_sec_end  [cou].substr(8, 3))/1000)
            ])
            cou ++;
        }
        return (asfadsf);
    }
    lyricReadRaw(){
        let self = this;
        return (self.original_lyric);
    }
    lyricReadMulti(size){
        
        
        let self = this;
        let cou = self.position;
        let buffer = [];


        if(0<cou){
            let step = size;
            //for (step = size; step != 0; step--) {
                let ssssize = cou-step;
                buffer.push([
                    self.timestemp_sec_start[ssssize], 
                    self.timestemp_sec_end[ssssize], 
                    self.original[ssssize], 
                    self.lexicon[ssssize], 
                    self.translated[ssssize]
                ]);
            //}
        }
        else{buffer.push([ "", "", "", "", "" ]);}


        let ssssize = cou;
        buffer.push([
            self.timestemp_sec_start[ssssize], 
            self.timestemp_sec_end[ssssize], 
            self.original[ssssize], 
            self.lexicon[ssssize], 
            self.translated[ssssize]
        ]);


        if(cou<self.size){
            let step = size;
            //for (step = 0; step < size; step++) {
                let ssssize = cou+step;
                buffer.push([
                    self.timestemp_sec_start[ssssize], 
                    self.timestemp_sec_end[ssssize], 
                    self.original[ssssize], 
                    self.lexicon[ssssize], 
                    self.translated[ssssize]
                ]);
            //}
        }
        else{buffer.push([ "", "", "", "", "" ]);}
        

        return (buffer);


    }


    lyricWriteRaw(sadasd){
        let self = this;
        self.save_lyric = sadasd;
    }
    lyricWriteTimeStart(time){
        let self = this;
        self.timestemp_sec_start[self.position] = this.timeConverter_from_sec(time)
    }
    lyricWriteTimeEnd(time){
        let self = this;
        self.timestemp_sec_end[self.position] = this.timeConverter_from_sec(time)
    }


    timeSave(){

        var self = this;
        
        let raw_buffer = self.save_lyric;
        let raw_save = raw_buffer;
        let raw_save1 = raw_buffer;

        // 작동하는 가사부분만 때내기
        let regex1 = RegExp(/\|{2}SEC\|{2}\d{4}\:\d{2}\.\d{3}\-\>\d{4}\:\d{2}\.\d{3}\n/, 'g');
        let regex2 = RegExp(/(\|{2}SEC\|{2}\d{4}\:\d{2}\.\d{3}\-\>\d{4}\:\d{2}\.\d{3}\n)$/);
        let array1;
        
        self.size = 0;
        let asfadf = 0;

        while ((array1 = regex1.exec(self.save_lyric)) !== null) {
            raw_save = raw_save
                    .slice(0, regex1.lastIndex)
                    .replace(
                        regex2,
                        "||SEC||"+
                        self.timestemp_sec_start[asfadf]+
                        "->"+self.timestemp_sec_end[asfadf]+"\n"
                    );
            raw_save = raw_save + raw_save1.slice(regex1.lastIndex);
            self.size++; asfadf++;
        };
        
        self.save_lyric = raw_save.toString();
        self.throwToServer_lyric = raw_save.toString();

    }
    lyricSave(){

    }


    cheackAndThrow(){
        let self = this;
        if(self.original_lyric == self.save_lyric){
            return null
        } else {
            return self.save_lyric;
        }
    }


    name(params) {
        

        var self = this;


        let codes = String(params);


        self.position = 0;

        
        self.original_lyric = params;
        self.save_lyric = params;
        self.throwToServer_lyric = params;


        // 인포파서
        self.parser_info = codes.match(/\<\={3}INFO\={3}\>.*\<\={3}\+{4}\={3}\>/s);

        self.parser_title = String(self.parser_info).match(/title=.*\n/);
        self.parser_oTitle = String(self.parser_info).match(/other_title=.*\n/);
        self.parser_composer = String(self.parser_info).match(/composer=.*\n/);
        self.parser_singer = String(self.parser_info).match(/singer=.*\n/);
        self.parser_lyric = String(self.parser_info).match(/lyric=.*\n/);

        self.parser_pSong = String(self.parser_info).match(/parent_song=.*\n/);
        self.parser_release = String(self.parser_info).match(/release=.*\n/);
        let adafafa = String(self.parser_info).match(/site=.*\n/);
        self.parser_site = String(adafafa).match(/(sm[0-9]*)/g);
        if(self.parser_site==null){self.parser_site = String(adafafa).match(/([0-9][0-9][0-9]*)/g);}
        else if(self.parser_site==null){self.parser_site = String(adafafa).match(/(nm[0-9]*)/g);}
        self.parser_oSite = String(self.parser_info).match(/site_other=.*\n/);

    
        // 가사파서
        self.timestemp_sec_start = [];
        self.timestemp_sec_end   = [];
        self.original = [];
        self.lexicon = [];
        self.translated = [];


        self.size = 0;


        // 작동하는 가사부분만 때내기
        codes.match(/\|\|SEC\|\|.*\|\|END\|\|/s).map( function(item, idx) {
            
            // 문단 분리
            item.split(/\|\|END\|\|/).map( function(item, idx) { 

                self.size++;
        
                let ssadas0 = null;
                let ssadas1 = null;
                let ssadas2 = null;
                let time_start = null;
                let time_end = null;
                let fdfdfdfd = item.match( /\|\|SEC\|\|.*\n/);
                if (fdfdfdfd!=null) {
                    time_start = String(fdfdfdfd).match(/\d{4}\:\d{2}\.\d{3}(?=\-\>)/);
                    time_end = String(fdfdfdfd).match(/\d{4}\:\d{2}\.\d{3}(?=\n)/);
                }
                
                ssadas0 = item.match( /\|{2}JPO\|{2}.*\n/ );
                if (ssadas0!=null) {
                    ssadas0 = String(ssadas0).replace(/\|{2}JPO\|{2}/,"");
                }
                ssadas1 = item.match( /\|{2}KRL\|{2}.*\n/ );
                if (ssadas1!=null) {
                    ssadas1 = String(ssadas1).replace(/\|{2}KRL\|{2}/,"");
                }
                ssadas2 = item.match( /\|{2}KRT\|{2}.*\n/ );
                if (ssadas2!=null) {
                    ssadas2 = String(ssadas2).replace(/\|{2}KRT\|{2}/,"");
                }

                self.timestemp_sec_start.push(String(time_start))
                self.timestemp_sec_end.push(String(time_end))
                self.original.push(String(ssadas0));
                self.lexicon.push(String(ssadas1));
                self.translated.push(String(ssadas2));

            })
        
        });

    }


}


export {User}; // 두 함수를 내보냄