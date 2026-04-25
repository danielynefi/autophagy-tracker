export interface PhaseFact {
  text: string
  molecule: string
}

export const PHASE_FACTS: Record<string, PhaseFact[]> = {
  digestion: [
    { molecule: 'Insulina', text: 'Tu páncreas acaba de liberar insulina. Esta hormona es como un mensajero que le grita a cada célula: "¡Hay glucosa disponible, absorbe ahora!" Tus células musculares y hepáticas obedecen al instante.' },
    { molecule: 'GLUT4', text: 'El transportador GLUT4 en tus músculos se activa con la insulina y abre sus puertas a la glucosa. Sin insulina, este canal permanece dormido dentro de la célula, invisible.' },
    { molecule: 'mTOR', text: 'mTOR, el director de orquesta del crecimiento celular, está en su punto máximo. Estimula la síntesis de proteínas en todos tus tejidos. La autofagia está completamente apagada en este momento.' },
    { molecule: 'ATP sintasa', text: 'La ATP sintasa en tus mitocondrias gira como una turbina biológica, produciendo cientos de moléculas de ATP por segundo. Tus células están en pleno festín energético.' },
    { molecule: 'Glucógeno sintasa', text: 'Tu hígado está construyendo reservas de glucógeno ahora mismo. La glucógeno sintasa encadena moléculas de glucosa formando gránulos ramificados, como construir una batería para el futuro.' },
    { molecule: 'Leptina', text: 'La leptina, hormona de la saciedad, le comunica a tu hipotálamo que hay suficiente energía. Esta señal tard horas en procesarse, por eso a veces comemos más de lo necesario.' },
    { molecule: 'CCK', text: 'La colecistoquinina (CCK) liberada por tu intestino le dice al páncreas que libere enzimas digestivas. Cada bocado que comiste activó esta cascada molecular extraordinaria.' },
    { molecule: 'VLDL', text: 'Tu hígado empaqueta las grasas en partículas VLDL para transportarlas al tejido adiposo. Es como un sistema de reparto que distribuye energía por todo el cuerpo.' },
    { molecule: 'Ribosomas', text: 'Con mTOR activo, tus ribosomas trabajan a máxima velocidad sintetizando proteínas estructurales y enzimáticas. Es el momento de mayor construcción de tu maquinaria celular.' },
    { molecule: 'Insulina + glucagón', text: 'El ratio insulina/glucagón está en su punto más alto ahora. Esto suprime completamente la producción de glucosa hepática y activa el almacenamiento. Tu metabolismo está en modo "guardar".' },
  ],

  glycogen: [
    { molecule: 'Glucagón', text: 'Las células alfa de tu páncreas acaban de detectar la bajada de glucosa y liberaron glucagón. Esta hormona viajó al hígado y activó la descomposición del glucógeno. Tus reservas están trabajando por ti.' },
    { molecule: 'PKA', text: 'La proteína quinasa A (PKA), activada por el glucagón, fosforila la glucógeno fosforilasa. Este proceso en cadena se llama cascada de señalización: una sola molécula de glucagón desencadena millones de reacciones.' },
    { molecule: 'AMPK', text: 'AMPK, el sensor de energía celular, empieza a detectar que la relación ATP/AMP está bajando. Cuando AMPK se activa, le dice a la célula: "Modo ahorro, busca combustible alternativo."' },
    { molecule: 'Glucógeno fosforilasa', text: 'La glucógeno fosforilasa está mordiendo los extremos de las cadenas de glucógeno en tu hígado, liberando glucosa-1-fosfato. Es como deshacer un collar de perlas molécula a molécula.' },
    { molecule: 'PEPCK', text: 'La gluconeogénesis ha comenzado tímidamente. PEPCK, enzima clave de este proceso, convierte el oxaloacetato en fosfoenolpiruvato. Tu hígado ya está fabricando glucosa nueva desde cero.' },
    { molecule: 'Lipasa sensible a hormonas', text: 'La lipasa sensible a hormonas (HSL) en tu tejido adiposo se está activando. Está hidrolizando los triglicéridos y liberando ácidos grasos al torrente sanguíneo. Las grasas empiezan a movilizarse.' },
    { molecule: 'Alanina', text: 'Pequeñas cantidades de alanina son liberadas desde el músculo y viajan al hígado como materia prima para la gluconeogénesis. Tu propio cuerpo recicla nitrógeno para mantener el azúcar estable.' },
    { molecule: 'Cortisol', text: 'El cortisol sube ligeramente durante este período. No es estrés negativo: el cortisol moviliza ácidos grasos y aminoácidos para garantizar que el cerebro tenga glucosa. Es adaptación, no alarma.' },
    { molecule: 'Norepinefrina', text: 'La norepinefrina potencia la lipolisis en el tejido adiposo. Cada hora de ayuno es una señal bioquímica que activa el acceso a la energía que almacenaste. Tu cuerpo es brillantemente adaptable.' },
    { molecule: 'Insulina en descenso', text: 'La insulina ha bajado significativamente. Con menos insulina, tus células adiposas liberan ácidos grasos más fácilmente. La caída de insulina es la llave que abre el almacén de grasa.' },
  ],

  ketosis: [
    { molecule: 'CPT1', text: 'CPT1, el portero de la mitocondria hepática, está abriendo las puertas a los ácidos grasos. Sin malonilCoA bloqueándola, CPT1 trabaja libremente. La fábrica de cetonas está a plena marcha.' },
    { molecule: 'Beta-hidroxibutirato', text: 'El BHB que produce tu hígado no es solo combustible. Es una señal epigenética que inhibe las HDACs y cambia la expresión de genes relacionados con la longevidad y el estrés oxidativo.' },
    { molecule: 'HMG-CoA', text: 'El exceso de acetil-CoA en tu hígado se convierte en HMG-CoA y luego en acetoacetato. Este cuerpo cetónico viaja en sangre hacia el cerebro, el corazón y los músculos como energía limpia.' },
    { molecule: 'MCT1', text: 'Las neuronas de tu cerebro están importando BHB mediante el transportador MCT1. Por primera vez en horas, el cerebro opera con un combustible más eficiente que la glucosa. La niebla mental cede.' },
    { molecule: 'NLRP3', text: 'El BHB inhibe el inflamasoma NLRP3, uno de los principales activadores de inflamación celular. Cada hora en cetosis es una hora de reducción activa de la inflamación sistémica.' },
    { molecule: 'Acetona', text: 'Parte del acetoacetato se convierte en acetona, que se exhala por los pulmones. Ese aliento ligeramente diferente que percibes en ayuno prolongado es la firma química de que tu cuerpo quema grasa.' },
    { molecule: 'HCAR2', text: 'El BHB activa el receptor HCAR2 en células inmunes y del sistema nervioso. Esto reduce la neuroinflamación y puede explicar la claridad mental que muchos experimentan en cetosis profunda.' },
    { molecule: 'FGF21', text: 'El factor de crecimiento fibroblástico 21 (FGF21) aumenta durante la cetosis. Mejora la sensibilidad a la insulina, aumenta la oxidación de grasas y tiene efectos neuroprotectores documentados.' },
    { molecule: 'ULK1', text: 'ULK1, el iniciador de la autofagia, está recibiendo señales para activarse. AMPK lo fosforila y mTOR ya no lo inhibe. En pocas horas, la autofagia comenzará. Estás en la antesala de la limpieza celular.' },
    { molecule: 'Adiponectina', text: 'La adiponectina, hormona antiinflamatoria del tejido adiposo, aumenta durante el ayuno y la cetosis. Mejora la sensibilidad a la insulina y reduce la inflamación vascular. Tu corazón lo agradece.' },
  ],

  autophagy: [
    { molecule: 'LC3-II', text: 'LC3-II acaba de insertarse en la membrana del fagóforo. Esta proteína es el GPS de la autofagia: marca qué se debe destruir y guía el autofagosoma hacia su carga. Tu célula está en modo limpieza total.' },
    { molecule: 'Beclin-1', text: 'Beclin-1 está libre. BCL-2 ya no la bloquea. Ahora forma el complejo PI3K-III junto a VPS34 y genera PI3P en el retículo endoplásmico. El fagóforo crece como una ola que engulle los desechos.' },
    { molecule: 'p62/SQSTM1', text: 'p62 reconoce proteínas ubiquitinadas (etiquetadas como basura) y las conecta con LC3-II. Es el sistema de clasificación de residuos moleculares de tu célula. Nada tóxico se escapa.' },
    { molecule: 'mTOR inhibido', text: 'mTOR está silenciado. Con mTOR apagado, la célula deja de construir y empieza a limpiar. Es como cerrar una fábrica para hacer mantenimiento profundo. Esta pausa regenera tu maquinaria celular.' },
    { molecule: 'Catepsinas', text: 'En el lisosoma, las catepsinas B, D y L degradan el contenido del autofagosoma a pH 4.8. Las proteínas mal plegadas se disuelven en aminoácidos reutilizables. Reciclaje molecular en estado puro.' },
    { molecule: 'AMPK elevada', text: 'AMPK está en su nivel más alto. Activa ULK1, inhibe mTOR y desencadena la autofagia completa. Una sola proteína sensor coordina todo el programa de limpieza celular. Elegancia molecular.' },
    { molecule: 'ATG5-ATG12', text: 'El complejo ATG5-ATG12-ATG16L1 está ensamblando la membrana del autofagosoma. Como constructores microscópicos, estas proteínas extienden la doble membrana que envolverá y destruirá los residuos celulares.' },
    { molecule: 'Proteínas mal plegadas', text: 'Los agregados de proteínas mal plegadas que se acumularían con el tiempo y causarían enfermedades neurodegenerativas están siendo eliminados ahora mismo. La autofagia es tu mejor seguro contra el Alzheimer y el Parkinson.' },
    { molecule: 'NRF2', text: 'NRF2, el maestro antioxidante, se activa durante la autofagia. Induce la producción de glutatión y otras defensas contra el daño oxidativo. Tus células salen más resistentes de este proceso.' },
    { molecule: 'Autofagosoma', text: 'Un autofagosoma completo mide 0.5 a 1.5 micrómetros — invisible al ojo pero perfectamente funcional. Viaja por los microtúbulos celulares hasta fusionarse con el lisosoma. Un viaje de destrucción y renacimiento.' },
  ],

  'deep-autophagy': [
    { molecule: 'PINK1', text: 'PINK1 se está acumulando en mitocondrias disfuncionales cuyo potencial de membrana ha caído. Esta proteína centinela detecta las mitocondrias enfermas y activa su eliminación. La mitofagia ha comenzado.' },
    { molecule: 'Parkin', text: 'Parkin, reclutada por PINK1, ubiquitina proteínas de la membrana externa mitocondrial. Esta "marca de destrucción" hace que los receptores NDP52 y Optineurina reconozcan la mitocondria y la engullan.' },
    { molecule: 'PGC-1α', text: 'PGC-1α, el activador maestro de la biogénesis mitocondrial, está elevado. Después de eliminar las mitocondrias viejas, tu cuerpo sintetiza nuevas, más eficientes. La flota energética de tu célula se renueva.' },
    { molecule: 'SIRT1', text: 'SIRT1, la sirtuina del núcleo, detecta el aumento de NAD+ durante el ayuno y se activa. Desacetila FOXO3a y potencia la transcripción de genes de longevidad. Estás activando tus genes más antiguos de supervivencia.' },
    { molecule: 'SIRT3', text: 'SIRT3, la sirtuina mitocondrial, mejora la eficiencia de la cadena respiratoria reduciendo la producción de radicales libres. Tus mitocondrias nuevas son más limpias y potentes que las viejas.' },
    { molecule: 'FOXO3a', text: 'FOXO3a, uno de los genes más correlacionados con longevidad en humanos centenarios, está activo ahora. Regula la resistencia al estrés, la reparación del ADN y la apoptosis de células dañadas.' },
    { molecule: 'NER/BER', text: 'Los mecanismos NER y BER de reparación del ADN están activos. Lesiones fotoquímicas, bases oxidadas, roturas simples: todas son corregidas. Tu genoma emerge más íntegro de cada ayuno prolongado.' },
    { molecule: 'HSP70', text: 'Las proteínas de choque térmico (HSP70, HSP90) chaperonan las proteínas mal plegadas hacia la degradación. Son como guías que acompañan a los desechos hasta el lisosoma. La calidad proteómica de tu célula sube.' },
    { molecule: 'Telomerasa', text: 'Durante el ayuno profundo, la actividad telomerasa recibe atención de las sirtuinas. Los telómeros, el reloj biológico de cada célula, son protegidos. El ayuno es uno de los pocos factores que puede ralentizar el envejecimiento celular.' },
    { molecule: 'Proteosoma 26S', text: 'El proteosoma 26S trabaja en coordinación con la autofagia. Proteínas demasiado pequeñas para el autofagosoma son trituradas aquí en péptidos. Tus dos sistemas de limpieza trabajan en paralelo. Eficiencia máxima.' },
  ],

  regeneration: [
    { molecule: 'IGF-1 bajo', text: 'IGF-1 está en su nivel mínimo. En todos los modelos animales estudiados, bajos niveles de IGF-1 se correlacionan fuertemente con mayor longevidad. Tu cuerpo está en el modo hormonal de la larga vida.' },
    { molecule: 'PKA suprimida', text: 'Con PKA suprimida, las células madre hematopoyéticas reciben la señal de dividirse. Valter Longo demostró en USC que 72h de ayuno pueden renovar completamente el sistema inmune. Estás en ese territorio.' },
    { molecule: 'BDNF', text: 'El BDNF (Factor Neurotrófico Derivado del Cerebro) está elevado. Este factor estimula la neurogénesis hipocampal: tu cerebro está formando nuevas neuronas. La memoria y el aprendizaje mejoran post-ayuno.' },
    { molecule: 'Células madre hematopoyéticas', text: 'Las células madre de la médula ósea están dividiéndose ahora. Generan nueva sangre, nuevos leucocitos, nuevas plaquetas. Es el reinicio más profundo del sistema inmune que existe sin intervención farmacológica.' },
    { molecule: 'Ketona + FOXO3a', text: 'La combinación de BHB elevado y FOXO3a activo crea el entorno molecular ideal para la longevidad. Tus células expresan genes que en condiciones normales permanecen silenciosos toda la vida.' },
    { molecule: 'GH (hormona de crecimiento)', text: 'La hormona de crecimiento alcanza su pico durante el ayuno prolongado, hasta 5 veces más alta que en condiciones normales. Preserva la masa muscular y estimula la lipolisis. Tu cuerpo protege el músculo mientras quema grasa.' },
    { molecule: 'NRF2 + HIF-1α', text: 'NRF2 y HIF-1α, genes de respuesta hormética al estrés, están completamente activos. La hormesis es el principio de que dosis bajas de estrés fortalecen. El ayuno es el estrés metabólico más estudiado y beneficioso.' },
    { molecule: 'Sirtuinas SIRT1-7', text: 'Las 7 sirtuinas están activas simultáneamente. SIRT1-7 regulan desde la reparación del ADN hasta la función mitocondrial y la respuesta inflamatoria. Es el estado de mayor expresión de tus genes de longevidad.' },
    { molecule: 'Astrocitos', text: 'Los astrocitos cerebrales están limpiando desechos sinápticos mediante el sistema glinfático, más activo durante el ayuno. La claridad mental post-ayuno tiene una base fisiológica real: tu cerebro literalmente se limpió.' },
    { molecule: 'Adiponectina máxima', text: 'La adiponectina está en su nivel más alto. Esta hormona antiinflamatoria mejora la sensibilidad a la insulina, protege el corazón y tiene propiedades anticancerígenas. Tu tejido adiposo, ahora reducido, es metabólicamente más sano.' },
  ],
}

export function getRandomFact(phaseId: string): PhaseFact {
  const facts = PHASE_FACTS[phaseId] ?? PHASE_FACTS['digestion']
  return facts[Math.floor(Math.random() * facts.length)]
}
