const rainDays = [5, 6, 7, 8, 9, 10, 11, 12];
const animalsDays = [7, 8, 9, 10, 11, 12];
const snowDays = [...animalsDays];

const description = `Jesteście rozbitkami na bezludnej wyspie.
 Jest koniec lata, musicie przygotować się na nadejście zimy
  — zbudować schronienie, dach, palisadę. Ciężko będzie przetrwać 
  nadchodzące ciężkie miesiące jesieni i zimy. Potrzebny będzie też
   stos drewna, który będzie można podpalić i liczyć, że jakiś statek 
   przepływający na horyzoncie was dostrzeże.`;

const objective = `Aby wygrać, gracze muszą wytworzyć przedmiot Ogień oraz
 zbudować stos drewna przedstawiony na karcie scenariusza. Jeśli w 10.,
 11. czy 12. rundzie warunki te są spełnione, to gracze wygrywają.`;

const mechanics = `Stos ma się składać z 15 znaczników drewna.
 Drewno na stos gracze mogą odkładać przed fazą Akcji. W jednej rundzie można
  odłożyć na stos dowolną ilość drewna, ale ukończyć nie więcej niż 1 etap budowy stosu. 
  (za pierwszym razem 1 znacznik drewna, następnie max. 2 znaczniki itd.), 
  Drewno odłożone na stos nie może być z niego zabrane.`;

export const castaways = {
  weather: {
    rain: rainDays,
    winter: snowDays,
    animals: animalsDays,
  },
  text: {
    description,
    objective,
    mechanics,
  },
};
