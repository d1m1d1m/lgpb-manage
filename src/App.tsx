import { HomeIcon } from "lucide-react";
import AppLogo from "./assets/main_logo.svg";
import categoriesData from "./mockdata/categories.json";
import { useEffect, useState } from "react";

export default function App()
{
  const [category, setCategory] = useState<number>(0);
  const [subCategory, setSubCategory] = useState<number>(0);
  const [subSubCategory, setSubSubCategory] = useState<number>(0);

  useEffect(() => {
    getSubCategories();
  }, [category]);

  useEffect(() => {
    getSubSubCategories();
  }, [subCategory]);

  function getSubCategories()
  {
    const subCategoryId = categoriesData.category.find(c => c.id === category)?.id;
    const subItems = categoriesData.sub_category.find(sc => sc.id === subCategoryId)

    return subItems;
  }

  function getSubSubCategories()
  {
    const subSubCategoryId = categoriesData.sub_sub_category.find(ssc => ssc.id === subCategory)?.id;
    const subSubItems = categoriesData.sub_sub_category.find(ssc => ssc.id === subSubCategoryId)

    return subSubItems;
  }

  return(
    <div className="h-screen overflow-hidden flex">
      <aside className="flex flex-col items-center w-24 border border-base-300">
        <a className="w-full border-b border-b-base-300 p-4" href="/">
          <img src={AppLogo} alt="" />
        </a>

        <nav>
          <ul>
            <li>
              <a href="#">
                <HomeIcon color="#f18a23"/>
              </a>
            </li>

            <li>
              <a href="#">
                <HomeIcon color="#f18a23"/>
              </a>
            </li>

            <li>
              <a href="#">
                <HomeIcon color="#f18a23"/>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex flex-col bg-base-100 w-full">
        {/* <h2 className="px-1 font-bold text-xl mb-4">Création de produit</h2> */}
          
        <div className="flex h-full gap-4 p-4">
          <form className="flex flex-col gap-2 overflow-y-scroll -scroll-m-10 min-w-fit">
            <fieldset className="h-full fieldset bg-[#fff5e3]/50 border-[#f18a23] rounded-box w-xs border px-4 py-2">
              <legend className="fieldset-legend text-base text-[#f18a23] px-2">Identification</legend>
              
              <label className="fieldset">
                <span className="label">EAN</span>
                <input type="text" className="input input-sm uppercase" placeholder="978020137962" />
              </label>

              <label className="fieldset">
                <span className="label">Nom du produit</span>
                <input type="text" className="input input-sm uppercase" placeholder="Jus d'orange" />
              </label>
              
              <label className="fieldset">
                <span className="label">Nom du produit (étiquette)</span>
                <input type="text" className="input input-sm uppercase" placeholder="Jus d'orange 1l" />
              </label>
            </fieldset>

            <fieldset className="h-full fieldset bg-[#fff5e3]/50 border-[#f18a23] rounded-box w-xs border px-4 py-2">
              <legend className="fieldset-legend text-base text-[#f18a23] px-2">Catégorisation</legend>
              
              <label className="fieldset">
                  <span className="label">Catégorie</span>
                  <select
                    className="select select-sm"
                    value={category}
                    onChange={(e) => {
                      setCategory(parseInt(e.target.value));
                      setSubCategory(0);
                    }}
                  >
                    <option value={0} disabled>Sélectionnez la catégorie</option>
                    
                    {categoriesData.category.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </label>

                <label className="fieldset">
                  <span className="label">Sous-catégorie</span>
                  <select
                    className="select select-sm"
                    disabled={category === 0}
                    value={subCategory}
                    onChange={(e) => setSubCategory(parseInt(e.target.value))}
                  >
                    <option value={0} disabled>Sélectionnez la sous-catégorie</option>
                    
                    {getSubCategories()?.items.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </label>

                <label className="fieldset">
                  <span className="label">Sous-sous-catégorie</span>
                  <select
                    className="select select-sm"
                    value={subSubCategory}
                    disabled={subCategory === 0 || category === 0}
                    onChange={(e) => setSubSubCategory(parseInt(e.target.value))}
                  >
                    <option disabled selected>Sélectionnez la Sous-sous-catégorie</option>

                    {getSubSubCategories()?.items.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </label>
            </fieldset>

            <fieldset className="h-full fieldset bg-[#fff5e3]/50 border-[#f18a23] rounded-box w-xs border px-4 py-2">
              <legend className="fieldset-legend text-base text-[#f18a23] px-2">Fournisseur</legend>
              
              <label className="fieldset">
                <span className="label">Fournisseur</span>
                <select className="select select-sm">
                  <option disabled selected>Sélectionnez le fournisseur</option>
                  <option>Markal</option>
                  <option>Senfas</option>
                  <option>Ekibio</option>
                  <option>Tera Viva</option>
                  <option>HBO</option>
                </select>
              </label>

              <label className="fieldset">
                <span className="label">Marque</span>
                <select className="select select-sm">
                  <option disabled selected>Sélectionnez la marque</option>
                  <option>Luce</option>
                  <option>Priméal</option>
                  <option>Quintesens</option>
                  <option>Philia</option>
                  <option>Natur'avenir</option>
                </select>
              </label>

              <label className="fieldset">
                <span className="label">Référence</span>
                <input type="text" className="input input-sm uppercase" placeholder="1902555" />
              </label>
            </fieldset>
          </form>

          <div className="w-full h-full pt-4">
            <div className="h-full tabs tabs-lift">
              <input type="radio" name="my_tabs_3" className="tab" aria-label="Prix" defaultChecked/>
              <div className="h-full tab-content bg-base-100 border-base-300 p-6">TODO : Définition de la TVA, des prix d'achat, des remises, de vente, promotions, etc</div>

              <input type="radio" name="my_tabs_3" className="tab" aria-label="Stock"/>
              <div className="h-full tab-content bg-base-100 border-base-300 p-6">TODO : Définition du colisage, du seuil d'alerte stocks et du grammage du produit etc</div>

              <input type="radio" name="my_tabs_3" className="tab" aria-label="Étiquette"/>
              <div className="h-full tab-content bg-base-100 border-base-300 p-6">TODO : Définition du layout de préférence de l'étiquette pour impression auto.</div>

              <input type="radio" name="my_tabs_3" className="tab" aria-label="Stats"/>
              <div className="h-full tab-content bg-base-100 border-base-300 p-6">TODO : Visualiser les performances de ventes du produits, les mouvements de stocks, etc</div>

              <input type="radio" name="my_tabs_3" className="tab" aria-label="Drive" />
              <div className="h-full tab-content bg-base-100 border-base-300 p-6">TODO : Ajouter les informations produits pour le drive : photos, descriptions, allergènes, etc</div>

              <input type="radio" name="my_tabs_3" className="tab" aria-label="Paramètres"/>
              <div className="h-full tab-content bg-base-100 border-base-300 p-6">TODO : Définir les paramètres de ventes du produit et la gestion des remises.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}