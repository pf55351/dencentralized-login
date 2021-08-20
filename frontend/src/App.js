import { useState, useCallback } from "react";
import "bulma/css/bulma.min.css";
import {
  Container,
  Heading,
  Content,
  Button,
  Image,
} from "react-bulma-components";
import Hero from "react-bulma-components/esm/components/hero";
import Footer from "react-bulma-components/cjs/components/footer";
import logo from "./metamask.svg";
import Web3 from "web3";
import Modal from "./Modal";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [ethAddress, setEthAddress] = useState("");
  const [fieldsModal, setFieldsModal] = useState(undefined);

  let web3 = new Web3(Web3.givenProvider);
  const hasMetamask = () => {
    const provider = web3.currentProvider;
    if (provider && provider === window.ethereum && provider.isMetaMask) {
      console.log("MetaMask is installed!");
      return true;
    } else {
      return false;
    }
  };

  /*
  const handlerClik =  useCallback(async(e) => {
    e.preventDefault();
    if (hasMetamask()) {
      console.log("OK METAMASK");
      console.log(web3.eth.accounts[0]);
      const accounts = await web3.eth.getAccounts()
      console.log(accounts[0])
      web3.eth.personal
        .sign(
          web3.utils.utf8ToHex("Hello world"),
          "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
          "test password!"
        )
        .then(console.log);
    } else {
      setFieldsModal({
        success: "false",
        danger: "true",
        title: "No Metamask Extension Founded",
        body: "Please install Metamask extension",
        show: "true",
        btnType: "danger",
      });
    }
  }, []);
  */

  const handlerClik = useCallback(async (e) => {
    e.preventDefault();
    if (hasMetamask()) {
      const accounts = await web3.eth.getAccounts()

      // equivalente di web3.eth.personal.sign
      // web3.eth.personal.sign chiama questa fx
      window.ethereum.sendAsync(
        {
          method: 'personal_sign',
          params: [web3.utils.utf8ToHex('Hello world'), accounts[0]],
          from: accounts[0]
        },
        (_err, { result }) => (_err ? console.error(_err) : console.log(result))
      )

      /*web3.eth.personal
        .sign(
          web3.utils.utf8ToHex("Hello world"),
          accounts[0]
        )
        .then(console.log);*/
    } else {
      setFieldsModal({
        success: "false",
        danger: "true",
        title: "No Metamask Extension Founded",
        body: "Please install Metamask extension",
        show: "true",
        btnType: "danger",
      });
    }
  }, [hasMetamask, web3.eth, web3.utils]);

  console.log("A", fieldsModal);

  return (
    <div>
      {fieldsModal !== undefined && (
        <Modal setFieldsModal={setFieldsModal} fieldsModal={fieldsModal} />
      )}
      <Hero size="fullheight">
        <Hero.Header backgroundColor="primary">
          <Container
            my={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={logo} size={128} />
            <Heading textColor={"white"}>Decentralized Login</Heading>
            <Heading textColor="grey" subtitle size={3}>
              Simple Login Demo with MetaMask
            </Heading>
          </Container>
        </Hero.Header>
        <Hero.Body>
          <Container display="flex" justifyContent="center" alignItems="center">
            <Content>
              <Button
                size="medium"
                loading={isLoading}
                rounded="true"
                fullwidth="true"
                color="warning"
                onClick={handlerClik}
              >
                Login with MetaMask
              </Button>
            </Content>
          </Container>
        </Hero.Body>
        <Hero.Footer>
          <Footer>
            <Container>
              <Content style={{ textAlign: "center" }}>
                <p>
                  <strong>Decentralized Login Demo</strong> by{" "}
                  <a
                    href="https://www.francescoprimerano.it"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Francesco Primerano
                  </a>
                  . The source code is licensed under
                  <a href="http://opensource.org/licenses/mit-license.php">
                    {" "}
                    MIT
                  </a>
                </p>
                <p>
                  The repository of this project is avaiable on{" "}
                  <a
                    href="https://github.com/pf55351/dencentralizedLogin"
                    rel="noreferrer"
                    target="_blank"
                  >
                    github
                  </a>
                </p>
              </Content>
            </Container>
          </Footer>
        </Hero.Footer>
      </Hero>
    </div>
  );
}

export default App;
