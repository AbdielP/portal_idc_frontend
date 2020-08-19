import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { FormulariosService } from 'src/app/services/formularios.service';

@Component({
  selector: 'app-editar-formulario',
  templateUrl: './editar-formulario.component.html',
  styleUrls: ['./editar-formulario.component.css']
})
export class EditarFormularioComponent implements OnInit {

  @ViewChild('file_label',{static:false}) label: ElementRef;
  
  token:any;
  form:FormGroup;
  error:String = '';
  success:String = '';
  form_desc:FormGroup;
  formulario:any = [''];

  constructor(private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder,
    private uploadService:UploadService, private formularioService:FormulariosService) { 
      this.token = localStorage.getItem('token');
      this.activatedRoute.params.subscribe(params=>{
        this.formularioService.getFormulario(params.doc,params.ext,this.token)
        .subscribe((resp:any)=>{
          // console.log(resp)
          this.formulario = resp.formulario[0];
        })
      })
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      documento:['']
    })
    this.form_desc = this.formBuilder.group({
      descripcion: ['']
    })
  }

  onFileChange(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.form.get('documento').setValue(file);
      this.label.nativeElement.innerHTML = file.name;
    }
  }

  onSubmit(){
    var formId = this.formulario.id; //ID DEL FORM A ACTUALIZAR
    var formViejo = this.formulario.nombre; //NOMBRE DEL FORM VIEJO PARA BORRARLO ANTES DE RE-SUBIR EL NUEVO DOC
    const formData = new FormData();
    formData.append('documento',this.form.get('documento').value);
    this.uploadService.update(formData,formId,formViejo).subscribe((resp:any)=>{
      this.formulario = resp.formulario[0];
      this.success = resp.msg;
      // console.log(resp)
    },(error)=>{
      this.error = error.error.msg;
      // console.log(error)
    })
  }
  //SUBMIT ACTUALIZACIÓN DE LA DESCRIPCIÓN DEL FORMULARIO
  onSubmitDesc(){
    var formId = this.formulario.id
    const formData = new FormData();
    formData.append('descripcion',this.form_desc.get('descripcion').value);
    this.formularioService.actualizarDescripcionForm(formData,formId,this.token).subscribe((resp:any)=>{
      // console.log(resp)
      this.formulario = resp.formulario[0];
      this.success = resp.msg;
    },(error)=>{
      this.error = error.error.msg;
      // console.log(error)
    })
  }

}
