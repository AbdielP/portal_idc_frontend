import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FechaService } from 'src/app/services/fecha.service';
import { FormulariosService } from 'src/app/services/formularios.service';
import { UploadErrorsService } from 'src/app/services/errors/upload-errors.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  @ViewChild('file_label',{static:false}) label: ElementRef;
  @ViewChild('descripcion_input',{static:false}) descripcion: ElementRef;

  form: FormGroup;
  error: string = "";
  formularios:any = [];
  label_text:string = "Escoger archivo";
  uploadResponse = {status:'',message:'',filePath:''};
  token:any;
  hoy:any = '';

  constructor(private formBuilder:FormBuilder ,private fechaService:FechaService,
    private formulariosService:FormulariosService,private uploadErrors:UploadErrorsService, private uploadService:UploadService) { 
    this.hoy = this.fechaService.getDate()

  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.form = this.formBuilder.group({
      documento: [''],
      descripcion:[''],
      createdAt:[this.hoy]
    });
    this.cargarFormularios();
  }

  onSubmit(){
    this.form.get('descripcion').setValue(this.descripcion.nativeElement.value);
    const formData = new FormData();
    formData.append('formulario',this.form.get('documento').value);
    formData.append('descripcion',this.form.get('descripcion').value);
    this.uploadService.upload(formData).subscribe((res)=> {
      this.uploadResponse = res;
      // console.log(res.message)
      if(res.formularios != null) this.formularios = res.formularios;
    },(error) => {
      // console.log(error)
      this.error = this.uploadErrors.uploadErrors(error);
    });
    this.resetearFormulario();
  }

  cargarFormularios(){
    this.formulariosService.getFormularios(this.token).subscribe((resp:any)=>{
      this.formularios = resp.formularios;
    }),(err)=>{
      console.log(err.error.error.message);
    }
  }

  onFileChange(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.form.get('documento').setValue(file);
      this.label.nativeElement.innerHTML = file.name;
    }
  }

  resetearFormulario(){
    this.label.nativeElement.innerHTML = this.label_text; //SI NO HAY ERROR, RESETEAR TEXTO, SI HAY, MANTENER EL FORM [!!NO SE MANTIENE SI HAY ERROR]
    this.descripcion.nativeElement.value = "";
    this.error = "";
  };

   //Función para ELIMINAR FORMULARIOS
   borrarForm(nombre:string,extension:string){
    var confirmacion = confirm(`¿Desea eliminar el documento ${nombre}?`)
    if(confirmacion == true){
      this.formulariosService.borrarForms(nombre,extension,this.token).subscribe((resp:any)=>{
        this.formularios = resp.formularios;
      },(error)=>{console.log(error)})
    }else{
      return false;
    }
  };

}
