export default function Attributes(power) {
  const total =
    power.powerstats.combat +
    power.powerstats.durability +
    power.powerstats.power +
    power.powerstats.speed +
    power.powerstats.strength;
  return total;
}
