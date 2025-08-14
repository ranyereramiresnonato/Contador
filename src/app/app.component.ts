import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  tempoJuntos: string = '';
  tempoCasados: string = '';
  private intervalId: any;

  // Datas iniciais
  dataNamoro = new Date(2024, 3, 6, 11, 0, 0); // Abril é mês 3 (0-indexed)
  dataCasamento = new Date(2024, 8, 14, 12, 0, 0); // Setembro é mês 8

  ngOnInit() {
    this.atualizarTempo();
    this.intervalId = setInterval(() => this.atualizarTempo(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  atualizarTempo() {
    const agora = new Date();
    this.tempoJuntos = this.calcularTempoCompleto(this.dataNamoro, agora);
    this.tempoCasados = this.calcularTempoCompleto(this.dataCasamento, agora);
  }

  calcularTempoCompleto(inicio: Date, fim: Date): string {
    let anos = fim.getFullYear() - inicio.getFullYear();
    let meses = fim.getMonth() - inicio.getMonth();
    let dias = fim.getDate() - inicio.getDate();
    let horas = fim.getHours() - inicio.getHours();
    let minutos = fim.getMinutes() - inicio.getMinutes();
    let segundos = fim.getSeconds() - inicio.getSeconds();

    // Ajustes se algum valor for negativo
    if (segundos < 0) { segundos += 60; minutos--; }
    if (minutos < 0) { minutos += 60; horas--; }
    if (horas < 0) { horas += 24; dias--; }
    if (dias < 0) {
      const mesAnterior = new Date(fim.getFullYear(), fim.getMonth(), 0);
      dias += mesAnterior.getDate();
      meses--;
    }
    if (meses < 0) { meses += 12; anos--; }

    return `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
  }

}
