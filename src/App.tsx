import { BarcodeIcon, ChartColumnIcon, MonitorIcon, PackageIcon, SaveIcon, Settings2Icon, TruckIcon, UsersRoundIcon, WrenchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function App()
{
  const [searchedProduct, setSearchedProduct] = useState<any>(null);
  const [productCategories, setProductCategories] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/categories`).then((r) => r.json()).then((d) => setProductCategories(d.categories));
  }, []);

  return(
    <div className="h-screen flex">
      <aside className="h-full border-r border-r-base-300 w-52">
        <header className="flex justify-center items-center p-4 border-b border-b-base-300 h-20">
          <img className="w-32" src="/mainLogo.png" alt="" />
        </header>

        <ul className="menu w-full">
          <li>
            <details>
              <summary>
                <BarcodeIcon className="size-5"/>
                Articles
              </summary>
              <ul>
                <li><a>Gérer</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <UsersRoundIcon className="size-5"/>
                Clients
              </summary>
              <ul>
                <li><a>TODO</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <PackageIcon className="size-5"/>
                Stocks
              </summary>
              <ul>
                <li><a>TODO</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <TruckIcon className="size-5"/>
                Commandes
              </summary>
              <ul>
                <li><a>TODO</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <MonitorIcon className="size-5"/>
                Caisses
              </summary>
              <ul>
                <li><a>TODO</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <ChartColumnIcon className="size-5"/>
                Statistiques
              </summary>
              <ul>
                <li><a>TODO</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <Settings2Icon className="size-5"/>
                Paramètres
              </summary>
              <ul>
                <li><a>TODO</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <WrenchIcon className="size-5"/>
                Outils
              </summary>
              <ul>
                <li><a>TODO</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </aside>

      <main className="flex flex-col w-full">
        <header className="flex items-center p-4 px-8 border-b border-b-base-300 h-20">
          <div className="join w-full">
            <div className="w-full">
              <div className="w-full">
                <input className="input join-item w-full" placeholder="Recherche rapide d'articles ..." />
              </div>
            </div>

            <select className="select join-item">
              <option selected>Code</option>
              <option>Référence</option>
            </select>

            <button className="btn join-item">Chercher</button>
          </div>
        </header>

        <div className="flex p-6 gap-6 w-full">
          <div className="flex flex-col gap-4">
            <div className="toast">
              <button className="alert alert-warning cursor-pointer">
                <SaveIcon className="size-5"/>
                <span>Enregistrer les changements</span>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const fd = new FormData(e.currentTarget);

                fetch(`http://127.0.0.1:3000/api/products/${fd.get('code')}`).then((r) => r.json()).then((d) => setSearchedProduct(d.product));
              }}
            >
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <label className="label">Code</label>
                <input className="input" name="code" type="text" placeholder="Scannez pour trouver" />
              </fieldset>
            </form>

            <form className="flex flex-col gap-4">
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" disabled={!searchedProduct}>
                <label className="label">Désignation</label>
                <input value={searchedProduct ? searchedProduct.title : null} className="input" type="text" placeholder="Jus d'orange 1L ..." />
                
                <label className="label">Libellé de vente</label>
                <input value={searchedProduct ? searchedProduct.title : null} type="text" className="input" placeholder="Jus d'orange grèce 1L ..." />
              </fieldset>

              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" disabled={!searchedProduct}>
                <label className="label">Rayon</label>
                <select className="select">
                  <option disabled selected>Sélectionnez un rayon</option>

                  {productCategories ? productCategories.map((pc) => (
                    <option key={pc.id} value={pc.id}>{pc.name}</option>
                  )) : null}
                </select>

                <label className="label">Gamme</label>
                <select className="select">
                  <option disabled selected>Sélectionnez une gamme</option>
                </select>

                <label className="label">Type</label>
                <select className="select">
                  <option disabled selected>Sélectionnez un type</option>
                </select>
              </fieldset>

              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" disabled={!searchedProduct}>
                <label className="label">Fournisseur</label>
                <select className="select">
                  <option disabled selected>Sélectionnez un fournisseur</option>
                </select>

                <label className="label">Marque</label>
                <select className="select">
                  <option disabled selected>Sélectionnez une marque</option>
                </select>

                <label className="label">Référence</label>
                <input type="text" className="input" placeholder="123456789"/>
              </fieldset>
            </form>
          </div>

          <div className="tabs tabs-lift w-full">
            <input className="tab" type="radio" name="my_tabs_3" aria-label="Prix" defaultChecked/>
            <form className="tab-content bg-base-100 border-base-300 p-6">
              <h2>Paramètrage des prix</h2>
            </form>

            <input className="tab" type="radio" name="my_tabs_3" aria-label="Stock"/>
            <form className="tab-content bg-base-100 border-base-300 p-6">
              <h2>Paramètrage des conditions de stockage</h2>
            </form>

            <input className="tab" type="radio" name="my_tabs_3" aria-label="Étiquette"/>
            <form className="tab-content bg-base-100 border-base-300 p-6">
              <h2>Paramètrage de l'étiquette</h2>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}