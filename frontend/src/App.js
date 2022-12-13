import { useState, useCallback, useMemo, useEffect } from "react";
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
import { detect } from "detect-browser";
import { messages } from "./Utils";
import { getNonce, login, logout } from "./AuthService";
import { isMobile } from "react-device-detect";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [ethAddress, setEthAddress] = useState("");
  const [userLogged, setUserLogged] = useState(false);
  const [fieldsModal, setFieldsModal] = useState();

  useEffect(() => {
    if (!isSupportedBroswer()) {
      setFieldsModal({
        success: "false",
        danger: "true",
        title: messages.METAMASK_NOT_FOUNDED,
        body: messages.METAMASK_NOT_SUPPORTED_BODY,
        show: "true",
        btnType: "danger",
      });
    }
  }, []);

  const web3 = useMemo(() => new Web3(Web3.givenProvider), []);

  const hasMetamask = useCallback(() => {
    const provider = web3.currentProvider;
    if (
      provider &&
      provider === window.ethereum &&
      window.ethereum.isMetaMask
    ) {
      console.log("MetaMask is installed!");
      return true;
    } else {
      return false;
    }
  }, [web3.currentProvider]);

  useEffect(() => {
    if (!hasMetamask()) {
      setFieldsModal({
        success: "false",
        danger: "true",
        title: messages.METAMASK_NOT_FOUNDED,
        body: isMobile
          ? messages.DEVICE_NOT_SUPPORTED
          : messages.INSTALL_METAMASK_BODY,
        show: "true",
        btnType: "danger",
      });
    }
  }, [hasMetamask]);

  const isSupportedBroswer = () => {
    const browser = detect().name;
    switch (browser) {
      case "safari":
        return false;
      default:
        return true;
    }
  };

  const handlerClikLogout = async () => {
    setIsLoading(true);
    setUserLogged(false);
    setEthAddress("");
    setFieldsModal();
    await logout({ address: ethAddress });
    setIsLoading(false);
  };

  const handlerClikLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setEthAddress(account);
      getNonce({ address: account })
        .then((res) => {
          const { nonce, welcomeMsg } = res.data;
          if (nonce && welcomeMsg) {
            const msg = `${welcomeMsg}${nonce}`;
            web3.eth.personal
              .sign(web3.utils.utf8ToHex(msg), account)
              .then((res) => login({ res, nonce, msg }))
              .then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                  setFieldsModal({
                    success: "true",
                    danger: "false",
                    title: messages.LOGIN_SUCCESS_TITLE,
                    body: res.data.message,
                    show: "true",
                    btnType: "success",
                  });
                  setUserLogged(true);
                }
              })
              .catch((err) => {
                setIsLoading(false);
                setFieldsModal({
                  success: "false",
                  danger: "true",
                  title: messages.NO_VALID_SIGN_TITLE,
                  body: err.response ? err.response.data.message : err.message,
                  show: "true",
                  btnType: "danger",
                });
              });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setFieldsModal({
            success: "false",
            danger: "true",
            title: messages.NO_VALID_ADDRESS_TITLE,
            body: err.message || err.response.data.message,
            show: "true",
            btnType: "danger",
          });
        });
    },
    [web3.utils, web3.eth]
  );

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
          <Container
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {userLogged === false ? (
              <Content>
                <Button
                  size="medium"
                  loading={isLoading}
                  rounded="true"
                  fullwidth="true"
                  color="warning"
                  onClick={handlerClikLogin}
                >
                  Login with MetaMask
                </Button>
              </Content>
            ) : (
              <Content
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Heading>Congratulation {ethAddress}</Heading>
                <Heading textColor="grey" subtitle size={3}>
                  You are logged correctly with MetaMask
                </Heading>
                <Button
                  size="medium"
                  loading={isLoading}
                  rounded="true"
                  fullwidth="true"
                  color="white-ter"
                  onClick={handlerClikLogout}
                  style={{ width: 250 }}
                >
                  Logout
                </Button>
              </Content>
            )}
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
                  The repository of this project is avaiable on
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
