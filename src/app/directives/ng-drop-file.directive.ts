import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFile]'
})
export class NgDropFileDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any){
    this.mouseSobre.emit(true);
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any){
    this.mouseSobre.emit(false);
  }

  private _archivoPuedeSerCargado(archivo: File): boolean{
    if (!this._archivosYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    }else{
      return false;
    }
  }
  private _prevenirDetener( event ){
    event.preventDefault();
    event.stopPropagation();
  }
  private _archivosYaFueDroppeado(nombreArchivo: string): boolean{
    for(const archivo of this.archivos){
      if (archivo.nombreArchivo == nombreArchivo) {
        console.log('El archivo '+nombreArchivo+' ya existe');
        return true;
      }
    }
    return false;
  }
  private _esImagen(tipoArchivo: string):boolean{
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
