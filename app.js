window.onload = () => {
	const { createApp } = Vue;

	createApp({
		data() {
			return {
				notes: [],
				note: "",
                priority:"",
                buscar:false,
                busqueda:"",
                isBoton : true,
                isDark : true,
			};
		},
		methods: {
			saveNote() {
				if(this.note != ""){
                    
                    this.notes.push({
                        text:this.note,
                        priority:1,
                        opciones : { year: 'numeric', month: 'short', day: 'numeric' },
                        date: Date.now(),
                        isCompleted: false,
                    });
				    this.note = "";
                    localStorage.setItem("notas",JSON.stringify(this.notes));
                }
			},
			clearNotes() {
				this.notes = [];
                localStorage.setItem("notas",JSON.stringify(this.notes));
			},
			changePriority(num,obj) {
                obj.priority = num;
                localStorage.setItem("notas",JSON.stringify(this.notes));
            },
            remove(obj){
                var date = obj.date;
                pos = this.notes.findIndex((obj) => obj.date === date);
                this.notes = this.notes.toSpliced(pos,1)
                localStorage.setItem("notas",JSON.stringify(this.notes));
            },
            removeComplete(){
                this.notes.forEach(element => {
                    if (element.isCompleted) {
                        this.remove(element);
                    }
                });
            },
            setCookie() {              
                this.isDark = this.isDark == true?false:true;
                var cookie = "background =" + this.isDark + "; path=/";
                document.cookie = cookie;
                this.cookie = this.getCookie();
            },
            getCookie() {
                var nombreCookie = "background=";
                var cookies = document.cookie.split(';');
            
                for(var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    if (cookie.indexOf(nombreCookie) === 0) {
                        return cookie.substring(nombreCookie.length, cookie.length)=="true";
                    }
                }
            },
            checkCookie(){
                if (this.getCookie()==undefined) {
                    this.setCookie();
                }else{
                    this.isDark=this.getCookie();
                }
            }
		},
        computed:{
            notasFiltrados(){
                if(this.buscar == true)
                    aux = this.notes.filter(n => n.text.includes(this.busqueda)==true);
                else{
                    this.busqueda = "";
                    aux = this.notes.filter(n => n.text.includes(this.busqueda)==true);
                }
                    
                return aux.sort((a,b) => {return b.priority-a.priority;});
            },
            task(){
                if(this.notes.length==0){
                    this.isBoton = false;
                    return "You haven't notes";
                }else{
                    completed = this.notes.filter( n => n.isCompleted==true ).length;
                    if(completed >0){
                        this.isBoton = true;
                    }else{
                        this.isBoton = false;
                    }
                    return "You have completed "+completed+" tasks out of "+this.notes.length
                }
            }
        },
        mounted(){
            notasEnNavegador = localStorage.getItem("notas");
            if(notasEnNavegador){
                this.notes = JSON.parse(notasEnNavegador);
            }
            this.checkCookie();
        }
	}).mount("#application");
};
