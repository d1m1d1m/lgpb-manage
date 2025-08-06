import { ScanLine, Search } from "lucide-react";
import Sidebar from "./components/Sidebar";

export default function App()
{
  return(
    <div className="flex h-screen">
      <Sidebar/>
      <main className="flex flex-col w-full">
        <header className="flex items-center justify-start max-h-12 min-h-12 bg-base-200 border-b border-b-base-300 p-4">
          <h1 className="text-md font-bold">Fiche article</h1>
        </header>
        
        <div className="flex p-4 gap-4 h-full">
          <form className="w-3/6 flex flex-col gap-4">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border px-4 pb-4">
              <legend className="fieldset-legend">Code produit</legend>
              
              <label className="input focus:outline-none">
                <ScanLine className="h-[1em]"/>
                <input className="focus:outline-none" type="search" required placeholder="Scannez pour rechercher" />
              </label>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border px-4 pb-4">
              <legend className="fieldset-legend">Informations</legend>
              
              <label className="label flex flex-col items-start">
                <span>Nom</span>
                <input className="input" type="name" required placeholder="Jus d'orange 1L" />
              </label>
              <label className="label flex flex-col items-start">
                <span>Nom (étiquette)</span>
                <input className="input" type="label-name" required placeholder="Jus d'orange 1L" />
              </label>
              <label className="label flex flex-col items-start">
                <span>Marque</span> 
                <select className="select" name="marque">
                  <option disabled selected>Définir la marque</option>
                </select>
              </label>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border px-4 pb-4">
              <legend className="fieldset-legend">Catégorie</legend>
              
              <label className="label flex flex-col items-start">
                <span>Rayon</span> 
                <select className="select" name="rayon">
                  <option disabled selected>Définir le rayon</option>
                </select>
              </label>
              <label className="label flex flex-col items-start">
                <span>Gamme</span> 
                <select className="select" name="gamme">
                  <option disabled selected>Définir la gamme</option>
                </select>
              </label>
              <label className="label flex flex-col items-start">
                <span>Type</span> 
                <select className="select" name="type">
                  <option disabled selected>Définir le type</option>
                </select>
              </label>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border px-4 pb-4">
              <legend className="fieldset-legend">Fournisseur</legend>
              
              <label className="label flex flex-col items-start">
                <span>Fournisseur</span> 
                <select className="select" name="fournisseur">
                  <option disabled selected>Définir le fournisseur</option>
                </select>
              </label>

              <label className="label flex flex-col items-start">
                <span>Référence</span>
                <input className="input" type="name" required placeholder="123456dsd58" />
              </label>
            </fieldset>
          </form>

          <div className="w-full h-full">
            <div className="tabs tabs-lift h-full">
              <input type="radio" name="my_tabs_3" className="tab" aria-label="Prix" defaultChecked/>
              <div className="tab-content bg-base-100 border-base-300 p-6">Prix</div>

              <input type="radio" name="my_tabs_3" className="tab" aria-label="Stocks" />
              <div className="tab-content bg-base-100 border-base-300 p-6">Stocks</div>

              <input type="radio" name="my_tabs_3" className="tab" aria-label="Étiquette" />
              <div className="tab-content bg-base-100 border-base-300 p-6">Étiquette</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}